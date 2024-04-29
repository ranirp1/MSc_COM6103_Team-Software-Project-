type KeyValueComponentProps = {
  data: string;
  value: string | undefined;
};

const KeyValueComponent = ({ data, value }: KeyValueComponentProps) => {
  return (
    <div className=" text-lg  flex flex-row">
      <div className="font-medium text-black">{data}</div>
      <p className="ml-2  text-primary">{value}</p>
    </div>
  );
};

export default KeyValueComponent;
