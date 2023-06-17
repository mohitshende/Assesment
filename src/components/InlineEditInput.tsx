import { useMutation } from "@apollo/client";
import { useState } from "react";

const InlineEditInput = ({
  id,
  field,
  setShowEditInput,
}: {
  id: string;
  field: string;
  setShowEditInput: ({
    fieldName,
    show,
  }: {
    fieldName: string;
    show: boolean;
  }) => void;
}) => {
  const [payload, setPayload] = useState(null);

  // const [patchLocation, { data, loading }] = useMutation(PATCH_LOCATION);

  const handleChange = (e) => {
    console.log(e);
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  if (field == "status") {
    <select
      name="status"
      placeholder="Select Status"
      value={payload?.status}
      onChange={handleChange}
    >
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
    </select>;
  }
  return (
    <input
      name={field}
      type="text"
      placeholder={`Enter ${field} name`}
      onChange={handleChange}
    />
  );
};

export default InlineEditInput;
