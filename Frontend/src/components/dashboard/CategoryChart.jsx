import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [
  "#4F46E5",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
  "#06B6D4",
  "#8B5CF6",
  "#84CC16",
];

const CategoryChart = ({ data = [] }) => {
  return (
    <div
      className="
      bg-white
      border
      border-gray-200
      rounded-3xl
      shadow-sm
      p-5
      sm:p-6
      h-[340px]
      sm:h-[380px]
      "
    >
      <div className="mb-6">
        <p
          className="
          uppercase
          tracking-[0.25em]
          text-[10px]
          sm:text-xs
          text-gray-400
          "
          style={{
            fontFamily: "IBM Plex Mono",
          }}
        >
          Analytics
        </p>

        <h3
          className="
          mt-2
          text-xl
          sm:text-2xl
          "
          style={{
            fontFamily: "General Sans SemiBold",
          }}
        >
          Category Distribution
        </h3>
      </div>

      {data.length === 0 ? (
        <div className="h-[78%] flex items-center justify-center text-gray-500">
          No category data available
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="78%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={4}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip formatter={(value) => [`${value} Tasks`, "Count"]} />

            <Legend
              verticalAlign="bottom"
              iconType="circle"
              height={36}
              wrapperStyle={{
                fontSize: "12px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryChart;
