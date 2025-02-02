import { useMutation } from "../hooks/useMutation";
import { getApiUrl } from "../providers/ApiProvider";

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
  const { mutation, isLoading, abort } = useMutation<ResponseType, RequestType>(
    {
      url: getApiUrl(),
      onSuccess(data) {
        console.log("Success", data);
      },
      onError(error) {
        console.log("Error", error);
      },
    }
  );

  const handleSubmitClassic = () =>
    mutation({
      title: "New Title",
      body: "New Body",
    });

  const handleSubmitPromise = async () => {
    const newBody = {
      title: "New Title",
      body: "New Body",
    };

    try {
      const response = await mutation(newBody);
      console.log("Response en promesse: ", response.data);
    } catch (error) {
      console.error("Error :", error);
    }
  };

  // Possibilité d'interrompre de la requête en cours
  const handleSubmitAbort = () => {
    mutation({
      title: "New Title",
      body: "New Body",
    });
    abort();
  };

  return (
    <>
      <div>
        <button onClick={handleSubmitClassic} disabled={isLoading}>
          {isLoading ? "Loading" : "Submit Classic"}
        </button>
        <button onClick={abort} disabled={!isLoading}>
          Abort
        </button>
      </div>
      <div>
        <button onClick={handleSubmitPromise} disabled={isLoading}>
          {isLoading ? "Loading" : "Submit Promise"}
        </button>
        <button onClick={abort} disabled={!isLoading}>
          Abort
        </button>
      </div>
      <div>
        <button onClick={handleSubmitAbort} disabled={isLoading}>
          {isLoading ? "Loading" : "Submit Abort"}
        </button>
        <button onClick={abort} disabled={!isLoading}>
          Abort
        </button>
      </div>
    </>
  );
}

export default Sample;
