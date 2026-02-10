import { Input } from "@/components/ui/input";

export default function DynamicForm({ fields, values, onChange }) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field._id}>
          <label className="block text-sm mb-1">{field.label}</label>
          <Input
            type={field.type}
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
