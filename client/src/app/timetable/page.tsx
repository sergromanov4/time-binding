import DateList from "@/components/DateList";

const Timetable = () => {
  return (
    <main className="flex width-full flex-col items-start justify-start gap-8 p-8 min-h-screen">
      <h2 className="text-slate-900 text-lg">Забронируй время</h2>

      <DateList />
    </main>
  );
};

export default Timetable;
