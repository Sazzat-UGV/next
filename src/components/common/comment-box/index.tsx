"use client";
import React, { useCallback, useEffect, useState } from "react";
import Avatars from "@/components/reuseable/avater";
import { SmallCicle } from "@/components/reuseable/small-circle";
import { Button, Input, Skeleton } from "@/components/ui";
import FavIcon from "@/icon/admin/favIcon";
import { cn, IsToken } from "@/lib/utils";
import { ChevronDown, ChevronUp, MessageSquareDiff } from "lucide-react";
import { useGetProfileQuery } from "@/redux/api/authApi";
import {
  useGetCommentQuery,
  useGetReplayQuery,
  useStoreCommentsMutation,
  useStoreReplayMutation,
  useToggleReactionMutation,
  useToggleReplayReactionMutation,
} from "@/redux/api/landing/commentApi";
import { modifyPayload } from "@/lib";
import SkeletonCount from "@/components/reuseable/skeleton-item/count";
import { useInView } from "react-intersection-observer";

export default function CommentBox({ id, commentCount }: any) {
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);
  const { data: profileData } = useGetProfileQuery({});
  const [storeComments] = useStoreCommentsMutation();
  const [isModifyId, setIsModifyId] = useState<any>();
  const [isSmall, setIsSmall] = useState(false);
  const isToken = IsToken() ? true : false;
  const { data: comments, isLoading: commentLoading } = useGetCommentQuery(
    {
      video_id: id,
      page,
    },
    {
      skip: !id,
    }
  );

  const [openReplies, setOpenReplies] = useState<number | null>(null);
  const [openReplyBox, setOpenReplyBox] = useState<number | null>(null);
  const [totalComment, setTotalComment] = useState<any>([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state to track submission status

  // Pagination
  const hasMore = totalComment.length < comments?.meta?.total;
  useEffect(() => {
    if (inView && hasMore) setPage((prev) => prev + 1);
  }, [inView, hasMore]);

  const commentData = comments?.data;

  // Filter out duplicates and add new unique comments
  useEffect(() => {
    if (commentData) {
      const uniqueComments = commentData.filter(
        (newComment: any) =>
          !totalComment.some(
            (existingComment: any) => existingComment.id === newComment.id
          )
      );

      if (uniqueComments.length > 0) {
        setTotalComment((prev: any) => [...prev, ...uniqueComments]);
      }
    }
  }, [commentData, totalComment]);

  // Modify the totalComment for the item
  useEffect(() => {
    if (!isModifyId?.id) return;

    setTotalComment(
      (
        prevComments: Array<{
          id: number;
          is_react: boolean;
          reactions_count_format: number;
        }>
      ) => {
        return prevComments.map((comment) => {
          if (comment.id !== isModifyId?.id) return comment;

          return {
            ...comment,
            is_react: isModifyId?.is_react,
            reactions_count_format: isModifyId?.reactions_count_format,
          };
        });
      }
    );
  }, [isModifyId]);

  // Handlers
  // const handleCommentSubmit = async (
  //   e: React.KeyboardEvent<HTMLInputElement>
  // ) => {
  //   e.stopPropagation(); // Prevent event bubbling
  //   if (e.key !== "Enter") return; // Handle only Enter key
  //   e.preventDefault();

  //   // Prevent multiple submissions
  //   if (isSubmitting) return;
  //   setIsSubmitting(true);

  //   const target = e.target as HTMLInputElement;
  //   const value = { video_id: id, comment: target.value };
  //   const data = modifyPayload(value);

  //   // Store the comment
  //   const res = await storeComments(data).unwrap();

  //   // Reset the input value if submission is successful
  //   if (res?.status) target.value = "";

  //   setIsSubmitting(false); // Re-enable submission
  // };

  // == handleCommentSubmit ==
  const [commentText, setCommentText] = useState("");
  const submitComment = async () => {
    const value = commentText.trim();
    if (!value || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const payload = modifyPayload({ video_id: id, comment: value });
      const res = await storeComments(payload).unwrap();
      if (res?.status) setCommentText("");
    } catch (err) {
      // handle/log error if needed
    } finally {
      setIsSubmitting(false);
    }
  };
  //  == toggle Replies==
  const toggleReplies = useCallback((id: number) => {
    setOpenReplies((prev) => (prev === id ? null : id));
  }, []);

  const toggleReplyBox = useCallback((id: number) => {
    setOpenReplyBox((prev) => (prev === id ? null : id));
  }, []);

  // comment item box start =======
  const commentItemBox = commentLoading ? (
    <SkeletonCount count={8}>{CommentSkeleton()}</SkeletonCount>
  ) : totalComment && totalComment.length > 0 ? (
    totalComment
      ?.sort((a: any, b: any) => b.id - a.id)
      ?.map((item: any, idx: any) => (
        <CommentItem
          key={idx}
          comment={item}
          isRepliesOpen={openReplies === item.id}
          isReplyBoxOpen={openReplyBox === item.id}
          onToggleReplies={() => toggleReplies(item.id)}
          onToggleReplyBox={() => toggleReplyBox(item.id)}
          setIsModifyId={setIsModifyId}
        />
      ))
  ) : (
    <p className="text-gray-500">No comments yet</p>
  );

  // pagination see more
  const handleSeeMore = hasMore && !commentLoading && (
    <div ref={ref} className="flex flex-col mt-5">
      <CommentSkeleton />
    </div>
  );
  // comment item box end =======

  return (
    <div className="border-gray-200 lg:block">
      <h2 className="text-lg font-semibold">{commentCount} Comments</h2>
      {commentLoading ? (
        <CommentBoxSkeleton />
      ) : isToken ? (
        <div className="flex items-center gap-3 mt-4">
          <Avatars
            src={profileData?.data?.avatar}
            fallback={profileData?.data?.name}
            alt={profileData?.data?.name}
          />
          <Input
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitComment();
              }
            }}
            placeholder={`Comment as ${profileData?.data?.name}`}
            className="flex-1 h-11 rounded-full bg-white"
          />
          <div className="block lg:hidden">
            <button
              onClick={submitComment}
              disabled={isSubmitting || commentText?.trim()?.length === 0}
              className="size-11 border  grid place-items-center cursor-pointer rounded-full"
            >
              <MessageSquareDiff size={20} className="text-[#888888] text-xs" />
            </button>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mt-6">
        {/* laptop and above  start*/}
        <div className="hidden lg:block space-y-6">
          {commentItemBox}
          {handleSeeMore}
        </div>

        {/* small device start */}
        <div className="block lg:hidden space-y-6  rounded-md">
          <ul className="border p-3 *:text-grays rounded-xl  justify-between">
            <li>
              <ul className="flex items-center justify-between">
                <li>See all Comments</li>
                <li
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSmall(!isSmall);
                  }}
                >
                  {isSmall ? <ChevronUp /> : <ChevronDown />}
                </li>
              </ul>
            </li>
            {isSmall && (
              <li className="mt-5">
                <div>
                  {commentItemBox}
                  {handleSeeMore}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ---------------- Comment Item ----------------
function CommentItem({
  comment,
  isRepliesOpen,
  isReplyBoxOpen,
  onToggleReplies,
  onToggleReplyBox,
  setIsModifyId,
}: any) {
  const {
    id,
    user,
    comment: text,
    created_at_format,
    is_react,
    reactions_count_format,
  } = comment || {};

  const [toggleReaction, { isLoading }] = useToggleReactionMutation();

  const handleReactionClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation(); // Prevent click event from bubbling up
    if (isLoading) return;
    const value = modifyPayload({ comment_id: parseInt(id) });
    const res = await toggleReaction(value).unwrap();

    if (res?.status) {
      setIsModifyId({
        id,
        is_react: res.is_react,
        reactions_count_format: res.reactions_count_format,
      });
    }
  };

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
              <span onClick={handleReactionClick}>
                {is_react ? (
                  <FavIcon name="lovefill" className="size-4 cursor-pointer" />
                ) : (
                  <FavIcon name="love" className="size-4 cursor-pointer" />
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
          <Button
            variant="ghost"
            className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
            size="sm"
            onClick={onToggleReplyBox}
          >
            Reply
          </Button>
        </div>

        {isRepliesOpen && <Replies comment_id={id} className="mt-3" />}
        {isReplyBoxOpen && (
          <ReplyBox
            onToggleReplyBox={onToggleReplyBox}
            comment_id={id}
            className="mt-3"
          />
        )}
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
  const [toggleReplayReaction, { isLoading }] =
    useToggleReplayReactionMutation();

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
                      <span
                        onClick={async () => {
                          if (!isLoading) {
                            const value = modifyPayload({ reply_id: id });
                            await toggleReplayReaction(value).unwrap();
                          }
                        }}
                      >
                        {is_react ? (
                          <FavIcon
                            name="lovefill"
                            className="size-4 cursor-pointer"
                          />
                        ) : (
                          <FavIcon
                            name="love"
                            className="size-4 cursor-pointer"
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

// ReplyBox --------------------
function ReplyBox({ comment_id, className, onToggleReplyBox }: any) {
  const [isText, setIsText] = useState("");
  const { data: profileData } = useGetProfileQuery({});
  const [storeReplay] = useStoreReplayMutation();

  const hanldeReplay = async () => {
    if (!isText.trim()) return;
    const value = {
      comment_id,
      reply: isText,
    };
    const data = modifyPayload(value);
    const res = await storeReplay(data).unwrap();
    if (res.status) {
      setIsText("");
      onToggleReplyBox?.();
    }
  };

  return (
    <div className={cn("flex gap-3", className)}>
      <Avatars
        src={profileData?.data?.avatar}
        fallback={profileData?.data?.name}
        alt={profileData?.data?.name}
      />
      <div className="flex-1">
        <Input
          value={isText}
          onChange={(e) => setIsText(e.target.value)}
          placeholder="Write your reply here..."
          className="border-x-0 flex-1 border-t-0 rounded-none"
        />
        <ul className="flex space-x-1 mt-2 justify-end">
          <li>
            <Button
              variant="ghost"
              className="bg-white rounded-full text-blacks/80 hover:bg-white h-6"
              size="sm"
              onClick={() => {
                setIsText("");
                onToggleReplyBox?.();
              }}
            >
              Cancel
            </Button>
          </li>
          <li>
            <Button
              onClick={() => hanldeReplay()}
              disabled={isText?.length > 0 ? false : true}
              variant="ghost"
              className="bg-grays-place hover:bg-grays-place rounded-full text-blacks/80 h-6"
              size="sm"
            >
              Save
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}

// Skeleton
function CommentSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-2">
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

function CommentBoxSkeleton() {
  return (
    <div className="flex items-center gap-3 mt-4">
      <Skeleton className="size-10 2xl:size-11 rounded-full" />
      <Skeleton className="flex-1 h-11 rounded-full" />
    </div>
  );
}
