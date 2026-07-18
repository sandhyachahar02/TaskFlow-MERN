import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const WeeklyChart = ({ data = [] }) => {
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
          Weekly Productivity
        </h3>
      </div>

      <ResponsiveContainer width="100%" height="78%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

          <XAxis
            dataKey="day"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip formatter={(value) => [`${value} Tasks`, "Created"]} />

          <Line
            type="monotone"
            dataKey="tasks"
            stroke="#4F46E5"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyChart;
