"use client";
import Avatars from "@/components/reuseable/avater";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { SmallCicle } from "@/components/reuseable/small-circle";
import { Button, ScrollArea, Skeleton } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { cn } from "@/lib";
import {
  useGetCommentQuery,
  useGetReplayQuery,
} from "@/redux/api/landing/commentApi";
import { ChevronDown } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function CommentChanel({ id }: any) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const { data: comments, isLoading: commentLoading } = useGetCommentQuery({
    video_id: id,
    page,
  });
  const [openReplies, setOpenReplies] = useState<number | null>(null);
  const [openReplyBox, setOpenReplyBox] = useState<number | null>(null);
  const [totalComment, setTotalComment] = useState<any>([]);

  // Pagination
  const hasMore = totalComment?.length < comments?.meta?.total;
  useEffect(() => {
    if (inView && hasMore) setPage((prev) => prev + 1);
  }, [inView, hasMore]);

  const commentData = comments?.data;
  useEffect(() => {
    if (commentData) {
      setTotalComment((prev: any) => [...prev, ...commentData]);
    }
  }, [commentData]);

  //    toggleReplies
  const toggleReplies = useCallback((id: number) => {
    setOpenReplies((prev) => (prev === id ? null : id));
  }, []);

  const toggleReplyBox = useCallback((id: number) => {
    setOpenReplyBox((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="border-gray-200">
      <ScrollArea className="h-[300px] p-0">
        <div className="space-y-6">
          {commentLoading ? (
            <SkeletonCount count={8}>{CommentSkeleton()}</SkeletonCount>
          ) : totalComment && totalComment.length > 0 ? (
            totalComment.map((item: any, idx: any) => (
              <CommentItem
                key={idx}
                comment={item}
                isRepliesOpen={openReplies === item.id}
                isReplyBoxOpen={openReplyBox === item.id}
                onToggleReplies={() => toggleReplies(item.id)}
                onToggleReplyBox={() => toggleReplyBox(item.id)}
              />
            ))
          ) : (
            <p className="text-gray-500">No comments yet</p>
          )}

          {hasMore && !commentLoading && (
            <div ref={ref} className="flex flex-col mt-5">
              <CommentSkeleton />
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

function CommentItem({ comment, isRepliesOpen, onToggleReplies }: any) {
  const {
    id,
    user,
    comment: text,
    created_at_format,
    is_react,
    reactions_count_format,
  } = comment || {};

  return (
    <div className="flex gap-3">
      <Avatars src={user?.avatar} fallback={user?.name} alt={user.name} />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold">{user.name}</span>
          <span className="text-gray-500">
            <SmallCicle /> {created_at_format}
          </span>
        </div>

        <div className="flex items-center space-x-8 mt-1">
          <p className="text-gray-800">{text}</p>
          <span className="flex items-center gap-1 text-gray-600">
            <span className="flex items-center gap-1">
              <span>
                {is_react ? (
                  <FavIcon name="lovefill" className="size-4" />
                ) : (
                  <FavIcon name="love" className="size-4" />
                )}
              </span>
              <span>
                {reactions_count_format !== "0" ? reactions_count_format : ""}
              </span>
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-600/90 flex items-center gap-1"
            onClick={onToggleReplies}
          >
            See Replies
            <ChevronDown
              className={cn(
                "transition-transform duration-200",
                isRepliesOpen ? "rotate-180" : ""
              )}
            />
          </Button>
        </div>

        {isRepliesOpen && <Replies comment_id={id} className="mt-3" />}
      </div>
    </div>
  );
}

// Replies -------------------------------
function Replies({ className, comment_id }: any) {
  const { data } = useGetReplayQuery(
    { comment_id },
    {
      skip: !comment_id,
    }
  );

  return (
    <div className="space-y-6">
      {data?.length > 0 ? (
        data?.map(
          ({
            reply,
            user,
            created_at_format,
            id,
            is_react,
            reactions_count_format,
          }: any) => (
            <div key={id} className={cn("flex gap-3", className)}>
              <Avatars
                src={user?.avatar}
                fallback={user?.name}
                alt={user?.name || "Anonymous User"}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">
                    {user?.name || "Anonymous User"}
                  </span>
                  <span className="text-gray-500">
                    <SmallCicle /> {created_at_format}
                  </span>
                </div>
                <div className="flex items-center space-x-8 mt-1">
                  <p className="mt-1 text-gray-800 break-words">{reply}</p>
                  <span className="flex items-center gap-1 text-gray-600">
                    <span className="flex items-center gap-1">
                      <span>
                        {is_react ? (
                          <FavIcon
                            name="lovefill"
                            className="size-4"
                          />
                        ) : (
                          <FavIcon
                            name="love"
                            className="size-4"
                          />
                        )}
                      </span>
                      <span className="text-blacks">
                        {reactions_count_format == "0"
                          ? ""
                          : reactions_count_format}
                      </span>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          )
        )
      ) : (
        <p className="text-sm text-gray-500">No replies yet</p>
      )}
    </div>
  );
}

// Skeleton
function CommentSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex  gap-2">
        <Skeleton className="size-10 2xl:size-11 rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="w-60 h-3" />
          <Skeleton className="w-50 h-3" />
          <div className="flex items-center gap-2">
            <Skeleton className="w-12 h-3" />
            <Skeleton className="w-12 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}
