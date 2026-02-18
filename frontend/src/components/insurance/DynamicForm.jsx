import { Input } from "@/components/ui/input";

export default function DynamicForm({ fields, values, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {fields.map((field) => (
        <div key={field._id} className="space-y-2">
          <label className="text-sm font-medium text-[rgb(var(--text))] ml-1">
            {field.label}
          </label>
          <Input
            type={field.type}
            className="h-11 bg-[rgb(var(--bg))] focus:bg-[rgb(var(--card))]"
            placeholder={`Enter ${field.label.toLowerCase()}`}
            value={values[field.name] ?? ""}
            onChange={(e) =>
              onChange(field.name, field.type === "number"
                ? Number(e.target.value)
                : e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
}