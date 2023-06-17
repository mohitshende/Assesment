import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { PATCH_LOCATION } from "../GraphQL/Mutations";

const InlineEditInput = ({
  refetch,
  id,
  field,
  setShowEditInput,
}: {
  refetch: () => void;
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

  const [patchLocation, { data, loading }] = useMutation(PATCH_LOCATION);

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  const handleChange = (e) => {
    if (field == "status") {
      patchLocation({
        variables: {
          locationPatchId: id,
          requestBody: payload,
          tenant: import.meta.env.VITE_TENANT,
        },
      });
    }
    setPayload({ ...payload, [e.target.name]: e.target.value });
  };

  if (field == "status") {
    return (
      <select
        name="status"
        placeholder="Select Status"
        value={payload?.status}
        onChange={handleChange}
        disabled={loading}
      >
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>
    );
  }
  return (
    <input
      name={field}
      type="text"
      placeholder={`Enter ${field} name`}
      onChange={handleChange}
      disabled={loading}
      onKeyUp={(e) => {
        if (e.key == "Enter") {
          patchLocation({
            variables: {
              locationPatchId: id,
              requestBody: payload,
              tenant: import.meta.env.VITE_TENANT,
            },
          });
        }
      }}
    />
  );
};

export default InlineEditInput;
