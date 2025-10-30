"use client";
import { Deletebtn, Editbtn } from "@/components/common/admin/reuseable";
import NavTitle from "@/components/common/admin/reuseable/nav-title";
import Form from "@/components/reuseable/from";
import { FromInputs } from "@/components/reuseable/from-inputs";
import { FromTextAreas } from "@/components/reuseable/from-textareas";
import Modal from "@/components/reuseable/modal";
import { Button } from "@/components/ui";
import useConfirmation from "@/context/delete-modal";
import { modifyPayload } from "@/lib";
import {
  useDeleteAdminFqaMutation,
  useGetAdminFqaQuery,
  useStoreAdminFqaMutation,
  useUpdateAdminFqaMutation,
} from "@/redux/api/admin/fqa1Api";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";

const intEditInfo = {
  id: "",
  question: "",
  answer: "",
};

export default function FQA() {
  const { confirm } = useConfirmation();
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [storeOpen, setStoreOpen] = useState(false);
  const { data: fqaData } = useGetAdminFqaQuery({});
  const [storeAdminFqa, { isLoading: storeLoading }] =
    useStoreAdminFqaMutation();
  const [updateAdminFqa, { isLoading: updateLoading }] =
    useUpdateAdminFqaMutation();
  const [deleteAdminFqa] = useDeleteAdminFqaMutation();
  const [isEditInfo, setIsEditInfo] = useState(intEditInfo);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  // edit  question & answer ====================
  const editfrom = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  useEffect(() => {
    if (isEditInfo) {
      editfrom.reset({
        question: isEditInfo.question,
        answer: isEditInfo.answer,
      });
    }
  }, [isEditInfo, editfrom]);

  const editSubmit = async (values: FieldValues) => {
    const value = {
      ...values,
      _method: "PUT",
    };
    const data = modifyPayload(value);
    const res = await updateAdminFqa({ id: isEditInfo.id, data }).unwrap();
    if (res.status) {
      toast.success("Update Successfull", {
        description: "Question & answer have been updated",
      });
      editfrom.reset();
      setEditOpen(false);
    }
  };

  // add question & answer ====================
  const storefrom = useForm({
    defaultValues: {
      question: "",
      answer: "",
    },
  });
  const StoreSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    const res = await storeAdminFqa(data).unwrap();
    if (res.status) {
      toast.success("Add Successfull", {
        description: "Question & answer have been added",
      });
      storefrom.reset();
      setStoreOpen(false);
    }
  };

  const handleDelete = async (id: any) => {
    const confirmed = await confirm({
      title: "You are going to delete this question",
      description:
        "After deleting, users can't find this question & answer anymore.",
    });
    if (confirmed) {
      await deleteAdminFqa(id).unwrap();
    }
  };

  return (
    <div>
      <NavTitle
        title="FAQ"
        subTitle="You can manage the FAQ section of MyTSV from here."
      />
      <div className="py-5" ref={containerRef}>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full">
            {fqaData?.map((item: any, index: number) => (
              <div key={item.id} className="flex">
                <div className="py-[10px] px-5 mb-4 bg-white rounded-md border cursor-pointer w-full">
                  <div
                    className="flex items-center justify-between"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h4 className="text-base font-medium text-[#1B1B1B]">
                      {item.question}
                    </h4>
                    <span>
                      {activeAccordion === index ? (
                        <ChevronUp
                          size={27}
                          className="text-primary rounded-full p-1"
                        />
                      ) : (
                        <ChevronDown
                          size={27}
                          className="text-primary rounded-full p-1"
                        />
                      )}
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      activeAccordion === index ? "max-h-full" : "max-h-0"
                    }`}
                    style={{
                      maxHeight: activeAccordion === index ? "500px" : "0px",
                    }}
                  >
                    <p className="text-sm lg:text-base mt-1">{item.answer}</p>
                  </div>
                </div>
                <div className="ml-2 w-32 flex gap-2">
                  <Editbtn
                    onClick={() => {
                      setIsEditInfo({
                        id: item?.id,
                        question: item?.question,
                        answer: item?.answer,
                      });
                      setEditOpen(true);
                    }}
                    className="rounded-md size-11"
                  />
                  <Deletebtn
                    onClick={() => handleDelete(item?.id)}
                    className="rounded-md size-11"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={() => setStoreOpen(!storeOpen)}
          variant="primary"
          size="lg"
          className="rounded-full mt-7"
        >
          <Plus className="text-white size-5" />
          Add FQA
        </Button>
      </div>
      {/*edit question*/}
      <Modal
        open={editOpen}
        setIsOpen={setEditOpen}
        title="Edit FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form from={editfrom} onSubmit={editSubmit} className="space-y-6 pt-4">
          <FromInputs
            label="Question"
            name="question"
            placeholder="Enter your Question"
            stylelabel="bg-white"
          />
          <FromTextAreas
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-3xl"
            stylelabel="bg-white"
          />
          <Button
            disabled={updateLoading}
            variant="primary"
            className="rounded-full w-full"
            size="lg"
          >
            Save changes
          </Button>
        </Form>
      </Modal>

      {/* added question */}
      <Modal
        open={storeOpen}
        setIsOpen={setStoreOpen}
        title="Add FAQ"
        titleStyle="text-center"
        className="sm:max-w-xl"
      >
        <Form
          from={storefrom}
          onSubmit={StoreSubmit}
          className="space-y-6 pt-4"
        >
          <FromInputs
            label="Question"
            name="question"
            placeholder="Enter your Question"
            stylelabel="bg-white"
          />
          <FromTextAreas
            label="Answer"
            name="answer"
            placeholder="Enter your Answer"
            className="min-h-44 rounded-3xl"
            stylelabel="bg-white"
          />
          <Button
            disabled={storeLoading}
            variant="primary"
            className="rounded-full w-full"
            size="lg"
          >
            Add
          </Button>
        </Form>
      </Modal>
    </div>
  );
}
