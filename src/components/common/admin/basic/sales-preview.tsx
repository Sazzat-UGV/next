import Avatars from "@/components/reuseable/avater";
import { Button, Input, ScrollArea, Skeleton } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import React, { useState } from "react";
import { Deletebtn, ImgBox } from "../reuseable";
import { ArrowRight, Check } from "lucide-react";
import { useGetDetailsSalesRepresenQuery } from "@/redux/api/admin/salesresApi";

export default function SalesPreview({ isInfo, setIsInfo, handleDelete }: any) {
  const [isManage, setIsManage] = useState({ show: false, copied: false });
  const [isShow, setIsShow] = useState(true);
  const isId = isInfo?.id;
  const { data, isLoading } = useGetDetailsSalesRepresenQuery(isId, {
    skip: !isId,
  });

  const toggleShow = () =>
    setIsManage((prev) => ({ ...prev, show: !prev.show }));

  const handleCopy = () => {
    if (!data?.secret_key) return;
    navigator.clipboard.writeText(data?.secret_key);
    setIsManage((prev) => ({ ...prev, copied: true }));
    setTimeout(() => {
      setIsManage((prev) => ({ ...prev, copied: false }));
    }, 1000);
  };

  return isShow ? (
    <div>
      {isLoading ? (
        <SkeletonItem />
      ) : (
        <>
          <div className="border p-2 rounded-xl">
            <div className="flex justify-between items-center pr-3">
              <div className="flex gap-2 items-center">
                <ImgBox
                  src={data?.photo || "/blur.png"}
                  className="size-20 rounded-full"
                  alt={`img-${data?.id}`}
                />
                <ul className="space-y-1 py-2">
                  <li className="font-medium text-lg mb-1">{data?.name}</li>
                  <li className="flex items-center text-grays space-x-1">
                    <FavIcon name="phone" color="#888888" className="size-4" />
                    <span>{data?.phone}</span>
                  </li>
                  <li className="flex items-center text-grays space-x-1">
                    <FavIcon name="mail" color="#888888" className="size-4" />
                    <span>{data?.email}</span>
                  </li>
                  <li className="flex items-center text-grays space-x-1">
                    <FavIcon
                      name="location"
                      color="#888888"
                      className="size-4"
                    />
                    <span>{data?.location}</span>
                  </li>
                </ul>
              </div>
              <Deletebtn onClick={() => handleDelete(data?.id)} />
            </div>
          </div>

          {/* Secret Key */}
          <div className="my-6">
            <h3 className="text-black text-base font-medium mb-1">
              Secret key
            </h3>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  value={isManage.show ? data?.secret_key : "**********"}
                  readOnly
                  className="w-full h-10 rounded-full pr-10"
                />
                <div
                  onClick={toggleShow}
                  className="absolute inset-y-0 cursor-pointer right-3 flex items-center"
                >
                  <FavIcon
                    name={isManage.show ? "eye" : "eyeno"}
                    color="#888888"
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopy}
                className="size-10 border hover:bg-transparent rounded-full flex-shrink-0"
              >
                {isManage.copied ? <Check /> : <FavIcon name="copy" />}
              </Button>
            </div>
          </div>

          <div>
            <h1 className="font-medium text-xl">Accounts created</h1>
            <div className="py-3">
              {data?.users?.length > 0 ? (
                <div className="space-y-3">
                  {data?.users?.slice(0, 3)?.map((item: any, index: any) => (
                    <SingleCard item={item} key={index} />
                  ))}
                  <div className="flex justify-center">
                    <Button
                      onClick={() => {
                        setIsInfo((prevState: any) => ({
                          ...prevState,
                          name: data?.name || "",
                        }));
                        setIsShow((prev) => !prev);
                      }}
                      variant="outline"
                      className="bg-transparent hover:bg-transparent rounded-full"
                    >
                      See all <ArrowRight className="-rotate-26" />
                    </Button>
                  </div>
                </div>
              ) : (
                <h1 className="text-gray1 text-center py-5">
                  Account Not found
                </h1>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  ) : (
    <ScrollArea className="h-[500px]">
      <div className="space-y-3 mr-5">
        {data?.users?.map((item: any, index: any) => (
          <SingleCard item={item} key={index} />
        ))}
      </div>
    </ScrollArea>
  );
}

function SingleCard({ item }: any) {
  return (
    <div className="border p-2 *:text-sm rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Avatars
            src={item?.avatar || "/blur.png"}
            fallback={item?.channel_name}
            alt="profile"
            fallbackStyle="avatar"
          />
          <span className="text-blacks">{item?.channel_name}</span>
        </div>
        <div className="text-blacks">{item?.created_at_date_formatted}</div>
        <div className="text-blacks">{item?.created_at_time_formatted}</div>
      </div>
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="py-5">
      <div className="border p-2 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex gap-1 mt-4 items-center">
            <Skeleton className="size-20 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[200px]" />
            </div>
          </div>
          <Skeleton className="size-10 rounded-xl" />
        </div>
      </div>
      <Skeleton className="w-full h-10 rounded-full my-5" />
      <div className="space-y-2">
        <Skeleton className="w-full h-10 rounded-xl" />
        <Skeleton className="w-full h-10 rounded-xl" />
        <Skeleton className="w-full h-10 rounded-xl" />
      </div>
    </div>
  );
}
