// fromData payload
export const modifyPayload = (values: any) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    return formData;
  };
  // bulkDelete payload
  export const modifyPayloadBulk = (key: string, values: any) => {
    const formData = new FormData();
    values?.forEach((item: any) => {
      formData.append(key, item);
    });

    return formData;
  };


//   modifyPayloadAll
  export const modifyPayloadAll = (values: any) => {
    const formData = new FormData();
  
    Object.entries(values).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
  
      if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value) || typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as any);
      }
    });
  
    return formData;
  };