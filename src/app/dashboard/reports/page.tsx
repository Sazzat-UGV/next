"use client";
import { ImgBox } from "@/components/common/admin/reuseable";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import NavItem from "@/components/common/dashboard/navber";
import VideoPlayer from "@/components/common/video-player";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";
import { ResponseApiErrors } from "@/helpers/error/ApiResponseError";
import Icon from "@/icon";
import { delay, modifyPayload } from "@/lib";
import {
  useAddAppealMutation,
  useGetReportDetailsQuery,
  useGetReportQuery,
} from "@/redux/api/dashboard/reportApi";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";
import z from "zod";

const appealSchema = z.object({
  subject: z.string().nonempty("Subject is required"),
  explanation: z.string().nonempty("Explanation is required"),
});

export default function Reports() {
  const [isPage, setIsPage] = useState<number>();
  const [isId, setIsId] = useState<string>();
  const [isSearch, setIsSearch] = useState("");
  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const [isAppeal, setIsAppeal] = useState(false);
  const [isView, setIsView] = useState(false);
  const [addAppeal, { isLoading: isLoadingAdd }] = useAddAppealMutation();
  const { data: report, isLoading } = useGetReportQuery({ ...query });
  const { data: details, isLoading: isLoadingView } = useGetReportDetailsQuery(
    isId as string,
    {
      skip: !isId,
    }
  );
  const { action_name, reason, action_issue, video } = details?.data || {};
  const from = useForm({
    resolver: zodResolver(appealSchema),
    defaultValues: {
      subject: "",
      explanation: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const value = {
      report_id: isId,
      ...values,
    };
    try {
      const data = modifyPayload(value);
      const res = await addAppeal(data).unwrap();
      if (res.status) {
        toast("Appeal Sent Successfully", {
          description: "Your appeal has been added.",
        });
        await delay(4050);
        from.reset();
        setIsId("");
        setIsAppeal(false);
      }
    } catch (err: any) {
      ResponseApiErrors(err?.data, from);
    }
  };

  return (
    <div>
      <NavItem
        title="Reports"
        hidediv={true}
        placeholder="Search Video"
        onSearch={(text) => setIsSearch(text)}
      />
      <Table className="border border-gray-300 mt-10">
        <TableHeader className="px-5">
          <TableRow className="rounded-tr-md">
            <TableHead className="border border-gray-300 text-base">
              Video
            </TableHead>
            <TableHead className="border border-gray-300 text-base">
              Reason
            </TableHead>
            <TableHead className="border border-gray-300 text-right pr-20 text-base">
              Appeal
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <SkeletonCount count={5}>{TableSkeleton()}</SkeletonCount>
          ) : report?.data?.length > 0 ? (
            report?.data?.map((item: any) => {
              const { id, action_name, action_issue, reason, video } =
                item || {};
              return (
                <TableRow key={id}>
                  <TableCell className="border border-gray-300 py-3 w-1/2">
                    <div className="flex items-center gap-4">
                      <ImgBox
                        src={video.thumbnail}
                        className="w-36 h-20"
                        alt="box"
                      />
                      <div className="w-full">
                        <h3 className="font-semibold">{video.title}</h3>
                        <p className="text-grays block break-all whitespace-normal line-clamp-2">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="border border-gray-300">
                    <div className="grid gap-1 text-sm">
                      <p className={`font-semibold text-reds`}>{action_name}</p>
                      <p className="text-blacks font-medium">
                        Reason: {reason}
                      </p>
                      <p className="text-grays">{action_issue}</p>
                    </div>
                  </TableCell>

                  <TableCell className="border border-gray-300 text-right pr-6">
                    <div className="flex justify-end gap-2">
                      <Button
                        onClick={() => {
                          setIsId(id);
                          if (!isLoadingView) {
                            setIsView(!isView);
                          }
                        }}
                        variant="outline"
                        className="rounded-full px-6"
                        size="sm"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => {
                          if (isId) {
                            setIsId("");
                          }
                          setIsId(id);
                          setIsAppeal(!isAppeal);
                        }}
                        variant={"primary"}
                        size="sm"
                        className="rounded-full px-6"
                      >
                        Appeal
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableNoItem
              title="No data is currently available for this section"
              className="xl:py-40"
              colSpan={3}
            />
          )}
        </TableBody>
      </Table>
      <ul className="flex flex-wrap justify-end pt-10">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...report?.meta}
          ></Pagination>
        </li>
      </ul>
      {/* Appeal to MyTSV  */}
      <Modal
        open={isAppeal}
        title="Appeal to MyTSV"
        setIsOpen={setIsAppeal}
        className="sm:max-w-4xl"
        titleStyle="text-center"
      >
        <Form className="space-y-6 pt-4" from={from} onSubmit={handleSubmit}>
          <FromInputs
            label="Subject"
            name="subject"
            placeholder="Subject hare"
            stylelabel="bg-white"
          />

          <FromTextAreas
            label="Your explanation"
            name="explanation"
            placeholder="Explanation hare"
            stylelabel="bg-white"
            className="min-h-56"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              size={"lg"}
              variant={"primary"}
              className="rounded-full text-base font-normal w-fit"
              disabled={isLoadingAdd}
            >
              Send{" "}
              <Icon name="sent" className="relative top-[1px]" width={18} />
            </Button>
          </div>
        </Form>
      </Modal>
      {/* View report */}
      <Modal
        title="View Report"
        open={isView}
        setIsOpen={setIsView}
        className="sm:max-w-5xl"
        titleStyle="text-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <VideoPlayer
             type={video?.type}
             video={video?.video}
             link={video?.link}
             thumbnail={video?.thumbnail}
              className="md:h-[300px]"
            />
            <div>
              <h1 className="text-lg lg:text-xl font-semibold text-blacks mt-3">
                {video?.title}
              </h1>
              <div className="border p-3 rounded-md my-5 shadow-xs">
                <p className="text-sm text-blacks font-semibold">
                  {video?.created_at_format}
                </p>
                <p className="mt-1  text-sm text-grays leading-relaxed">
                  {video?.description}
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <ul className="border py-2 px-4 rounded-full flex items-center justify-between">
              <li className="font-medium">Reason</li>
              <li className="flex gap-2">
                {reason} <Icon name="quesReads" />
              </li>
            </ul>
            <ul className="border py-2 px-4 rounded-full flex items-center justify-between">
              <li className="font-medium">Action</li>
              <li className="flex gap-2">
                {action_name} <Icon name="exBlack" />
              </li>
            </ul>
            <div className="border p-3 rounded-md shadow-xs">
              <p className="text-xl text-reds  font-semibold">Issue</p>
              <p className="mt-1  text-sm text-grays leading-relaxed">
                {action_issue}
              </p>
            </div>
            <Button
              onClick={() => {
                setIsView(false);
                setIsAppeal(true);
              }}
              variant={"primary"}
              className="rounded-full w-full"
            >
              Appeal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

// skeleton for the table
function TableSkeleton() {
  return (
    <TableRow>
      <TableCell className="border border-gray-300 py-3 w-1/2">
        <div className="flex items-center gap-2">
          <Skeleton className="w-36 h-20 rounded-md" />
          <div className="w-full space-y-2">
            <Skeleton className="w-[80%] h-4 rounded-sm" />
            <Skeleton className="w-full h-4 rounded-sm" />
            <Skeleton className="w-full h-4 rounded-sm" />
          </div>
        </div>
      </TableCell>

      <TableCell className="border border-gray-300 w-1/2">
        <div className="w-full space-y-2">
          <Skeleton className="w-[80%] h-4 rounded-sm" />
          <Skeleton className="w-full h-4 rounded-sm" />
          <Skeleton className="w-full h-4 rounded-sm" />
        </div>
      </TableCell>

      <TableCell className="border border-gray-300 w-[50%] text-right pr-6">
        <div className="flex justify-end gap-2">
          <Skeleton className="w-[100px] h-8 rounded-full" />
          <Skeleton className="w-[100px] h-8 rounded-full" />
        </div>
      </TableCell>
    </TableRow>
  );
}
