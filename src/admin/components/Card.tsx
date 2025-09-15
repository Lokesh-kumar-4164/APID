interface CardProps {
  title: string;
  value: string | number;
  color?: string;
}

const Card = ({ title, value, color = "bg-blue-500" }: CardProps) => {
  return (
    <div className={`p-6 rounded-lg shadow-md text-white ${color}`}>
      <h3 className="text-sm uppercase">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Card;
