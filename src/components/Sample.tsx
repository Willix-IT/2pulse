import { useMutation } from "../hooks/useMutation";

interface ResponseType {
  id: number;
  title: string;
  body: string;
}

interface RequestType {
  title: string;
  body: string;
}

function Sample() {
  const { mutation, isLoading, abort } = useMutation<ResponseType, RequestType>({
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "POST",
    onSuccess(data) {
      console.log("Success", data);
    },
    onError(error) {
      console.log("Error", error);
    },
  });

  const handleSubmit = async () => {
    const newBody = {
      title: "New Title",
      body: "New Body",
    };

    try {
      const response = await mutation(newBody);
      console.log("Response: ", response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };
  return (
    <div>
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Loading" : "Submit"}
      </button>
      <button onClick={abort} disabled={!isLoading}>
        Abort
      </button>
    </div>
  );
}

export default Sample;
