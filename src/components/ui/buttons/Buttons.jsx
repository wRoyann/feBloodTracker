import { Button } from "@/components/ui/button";

const Buttons = ({ className, type, variant, onClick, disabled, children }) => {
  return (
    <div>
      <Button
        variant={variant}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {children}
      </Button>
    </div>
  );
};

export default Buttons;
