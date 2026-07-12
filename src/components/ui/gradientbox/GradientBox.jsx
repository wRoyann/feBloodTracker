const GradientBox = ({ children }) => {
  return (
    <div
      className="rounded-3xl p-8 text-white overflow-hidden"
      style={{
        background: `
      radial-gradient(circle at top right, rgba(183,0,17,0.45) 0%, transparent 35%),
      linear-gradient(135deg, #281715 0%, #2A1717 45%, #1F1212 100%)
    `,
      }}
    >
      {children}
    </div>
  );
};

export default GradientBox;
