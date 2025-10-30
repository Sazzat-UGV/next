"use client";
import SalesPreview from "@/components/common/admin/basic/sales-preview";
import SalesStore from "@/components/common/admin/basic/sales-store";
import {
  CustomTable,
  Deletebtn,
  Previewbtn,
} from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import SearchBox from "@/components/common/admin/reuseable/search";
import { TableNoItem } from "@/components/common/admin/reuseable/table-no-item";
import { TableSkeleton } from "@/components/common/admin/reuseable/table-skeleton";
import Avatars from "@/components/reuseable/avater";
import Modal from "@/components/reuseable/modal";
import { Pagination } from "@/components/reuseable/pagination";
import { Button, TableCell, TableRow } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import {
  useDeleteSalesRepresenMutation,
  useGetSalesRepresenQuery,
} from "@/redux/api/admin/salesresApi";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

const intInfo = {
  id: "",
  name: "",
};

export default function SalesrepResentatives() {
  const { confirm } = useConfirmation();
  const [isStore, setIsStore] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [isPage, setIsPage] = useState<number>(1);
  const [isSearch, setIsSearch] = useState("");
  const [isInfo, setIsInfo] = useState(intInfo);

  const [value] = useDebounce(isSearch, 1000);
  const query: Record<string, any> = {
    page: isPage,
    ...(value && { search: value }),
  };
  const { data: salesRepresen, isLoading } = useGetSalesRepresenQuery({
    ...query,
  });
  const [deleteSalesRepresen] = useDeleteSalesRepresenMutation();
  const headers = ["Sl. No", "Name", "Phone number", "Location", "Action"];

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "Are you sure to delete this Sales Representatives?",
      description:
        "This sales representatives will no longer able to access his account.",
    });
    if (confirmed) {
      const res = await deleteSalesRepresen(id).unwrap();
      if (!res.status) {
        toast.error("Linked sales exist", {
          description: res?.message,
        });
      }
    }
  };

  useEffect(() => {
    if (!isDetails) {
      setIsInfo(intInfo);
    }
  }, [isDetails]);

  return (
    <div>
      <NavTitle
        title="Sales Representatives"
        subTitle="You can manage your sales representatives from here"
      />
      <ul className="flex justify-between">
        <li>
          {" "}
          <SearchBox
            placeholder="Search for sales representatives"
            onSearch={(text) => setIsSearch(text)}
            className="min-w-md"
          />
        </li>
        <li>
          <Button
            onClick={() => setIsStore(!isStore)}
            variant="primary"
            size="lg"
            className="rounded-full"
          >
            <Plus className="text-white size-5" />
            Add
          </Button>
        </li>
      </ul>
      <div>
        <CustomTable headers={headers}>
          {isLoading ? (
            <TableSkeleton
              colSpan={headers?.length}
              tdStyle="!pl-0 !bg-background"
            />
          ) : salesRepresen?.data.length > 0 ? (
            salesRepresen?.data?.map((item: any, index: any) => (
              <TableRow key={index}>
                {/* Sl No */}
                <TableCell>{index + 1}</TableCell>

                {/* Channel Name with Image */}
                <TableCell className="relative">
                  <div className="flex items-center gap-2">
                    <Avatars
                      src={item.photo}
                      fallback={item.name}
                      alt="profile"
                      fallbackStyle="avatar"
                    />
                    <span>{item.name}</span>
                  </div>
                </TableCell>

                {/* Reason */}
                <TableCell>{item.phone}</TableCell>

                {/* Amount */}
                <TableCell>{item.location}</TableCell>
                <TableCell>
                  <ul className="flex gap-2">
                    <li>
                      <Previewbtn
                        onClick={() => {
                          setIsInfo((prevState) => ({
                            ...prevState,
                            id: item.id,
                          }));
                          setIsDetails(!isDetails);
                        }}
                      />
                    </li>
                    <li>
                      <Deletebtn onClick={() => handleDelete(item.id)} />
                    </li>
                  </ul>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableNoItem
              colSpan={headers?.length}
              title="No sales representatives are available at the moment"
              tdStyle="!bg-background"
            />
          )}
        </CustomTable>
      </div>
      <ul className="flex flex-wrap justify-end my-7">
        <li className="font-medium">
          <Pagination
            onPageChange={(v: any) => setIsPage(v)}
            {...salesRepresen?.meta}
            activeStyle="!rounded-full !bg-reds !border-none !text-white hover:!text-white"
            itemStyle="rounded-full"
          ></Pagination>
        </li>
      </ul>
      {/* details box*/}
      <Modal
        open={isStore}
        setIsOpen={setIsStore}
        title="Add Representative"
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <SalesStore setIsStore={setIsStore} />
      </Modal>
      <Modal
        open={isDetails}
        setIsOpen={setIsDetails}
        title={
          isInfo?.name
            ? `All accounts created by ${isInfo?.name}`
            : "Representative Details"
        }
        titleStyle="text-center"
        className="sm:max-w-lg"
      >
        <SalesPreview
          handleDelete={handleDelete}
          setIsInfo={setIsInfo}
          isInfo={isInfo}
        />
      </Modal>
    </div>
  );
}
