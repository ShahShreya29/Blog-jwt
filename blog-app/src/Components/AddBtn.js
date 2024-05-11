const AddBtn = ({ onClick, children, style }) => {
  return (
    <button className="btn" type="submit" style={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default AddBtn;
