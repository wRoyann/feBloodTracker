import { Button } from "@/components/ui/button";

const Buttons = ({ className, type, variant, children }) => {
  return (
    <div>
      <Button variant={variant} type={type} className={className}>
        {children}
      </Button>
    </div>
  );
};

export default Buttons;
