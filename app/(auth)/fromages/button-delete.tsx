import { deleteItem } from "@/actions/fromages";
import { Button } from "@/components/ui/button";

const ButtonDelete = ({ id }: { id: string }) => {
  return (
    <>
      <Button
        onClick={async () => {
          const result = await deleteItem(id);
          console.log(result);
        }}
      >
        Delete
      </Button>
    </>
  );
};

export default ButtonDelete;
