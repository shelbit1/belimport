"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface Product {
  id: number;
  productName: string;
  productDescription: string;
  tnvedCode: string;
  volume: string;
  grossWeight: string;
  netWeight: string;
  cost: string;
}

interface FormData {
  countryFrom: string;
  cityFrom: string;
  deliveryTerms: string;
  cityTo: string;
  exportLicense: string;
  deliveryWishes: string;
  paymentForm: string;
}

const initialProduct: Omit<Product, "id"> = {
  productName: "",
  productDescription: "",
  tnvedCode: "",
  volume: "",
  grossWeight: "",
  netWeight: "",
  cost: "",
};

const initialFormData: FormData = {
  countryFrom: "",
  cityFrom: "",
  deliveryTerms: "",
  cityTo: "",
  exportLicense: "",
  deliveryWishes: "",
  paymentForm: "",
};

export default function Home() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [products, setProducts] = useState<Product[]>([
    { ...initialProduct, id: 1 },
  ]);
  const [nextProductId, setNextProductId] = useState(2);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProductChange = (
    productId: number,
    field: keyof Omit<Product, "id">,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === productId ? { ...product, [field]: value } : product
      )
    );
  };

  const addProduct = () => {
    setProducts((prev) => [...prev, { ...initialProduct, id: nextProductId }]);
    setNextProductId((prev) => prev + 1);
  };

  const removeProduct = (productId: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId));
  };

  const downloadExcel = () => {
    const workbook = XLSX.utils.book_new();

    // Создаем массив данных для листа
    const sheetData: any[][] = [];

    // Заголовок
    sheetData.push(["ЗАЯВКА НА ИМПОРТ"]);
    sheetData.push([]);

    // Общие данные
    sheetData.push(["Страна отправки", formData.countryFrom]);
    sheetData.push(["Город отправки", formData.cityFrom]);
    sheetData.push(["Условия поставки", formData.deliveryTerms]);
    sheetData.push(["Город назначения", formData.cityTo]);
    sheetData.push([
      "Экспортная лицензия у поставщика",
      formData.exportLicense,
    ]);
    sheetData.push([
      "Способы оплаты за белую доставку",
      formData.paymentForm,
    ]);
    sheetData.push([
      "Пожелания по срокам доставки",
      formData.deliveryWishes,
    ]);
    sheetData.push([]);

    // Заголовок таблицы товаров
    sheetData.push(["ТОВАРЫ"]);
    sheetData.push([
      "№",
      "Наименование",
      "Характеристика (состав)",
      "Код ТНВЭД",
      "Объем, м³",
      "Брутто, кг",
      "Нетто, кг",
      "Стоимость, $",
    ]);

    // Данные товаров
    products.forEach((product, index) => {
      sheetData.push([
        index + 1,
        product.productName,
        product.productDescription,
        product.tnvedCode,
        product.volume,
        product.grossWeight,
        product.netWeight,
        product.cost,
      ]);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, "Заявка");

    // Настройка ширины столбцов
    worksheet["!cols"] = [
      { wch: 5 },  // №
      { wch: 25 }, // Наименование
      { wch: 30 }, // Характеристика
      { wch: 12 }, // ТНВЭД
      { wch: 12 }, // Объем
      { wch: 12 }, // Брутто
      { wch: 12 }, // Нетто
      { wch: 15 }, // Стоимость
    ];

    XLSX.writeFile(workbook, "белый_импорт_заявка.xlsx");
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="px-6 py-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-black text-center">Белый Импорт</h1>
      </header>

      <main className="max-w-7xl mx-auto p-4">
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          {/* Секция отправки */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <FormField
              label="Страна отправки"
              value={formData.countryFrom}
              onChange={(v) => handleChange("countryFrom", v)}
            />
            <FormField
              label="Город отправки"
              value={formData.cityFrom}
              onChange={(v) => handleChange("cityFrom", v)}
            />
            <FormField
              label="Условия поставки"
              value={formData.deliveryTerms}
              onChange={(v) => handleChange("deliveryTerms", v)}
            />
            <FormField
              label="Город назначения"
              value={formData.cityTo}
              onChange={(v) => handleChange("cityTo", v)}
            />
          </div>

          {/* Секция товаров */}
          <div className="border-t border-gray-200 pt-4 space-y-2">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded p-2 bg-gray-50 flex items-end gap-2"
              >
                <div className="flex-shrink-0 w-12 text-xs font-medium text-gray-600">
                  {index + 1}
                </div>
                <CompactField
                  label="Наименование"
                  value={product.productName}
                  onChange={(v) =>
                    handleProductChange(product.id, "productName", v)
                  }
                  className="flex-1 min-w-[120px]"
                />
                <CompactField
                  label="Характеристика"
                  value={product.productDescription}
                  onChange={(v) =>
                    handleProductChange(product.id, "productDescription", v)
                  }
                  className="flex-1 min-w-[120px]"
                />
                <CompactField
                  label="Код ТНВЭД"
                  value={product.tnvedCode}
                  onChange={(v) =>
                    handleProductChange(product.id, "tnvedCode", v)
                  }
                  className="w-24"
                />
                <CompactField
                  label="Объем, м³"
                  value={product.volume}
                  onChange={(v) =>
                    handleProductChange(product.id, "volume", v)
                  }
                  type="number"
                  className="w-20"
                />
                <CompactField
                  label="Брутто, кг"
                  value={product.grossWeight}
                  onChange={(v) =>
                    handleProductChange(product.id, "grossWeight", v)
                  }
                  type="number"
                  className="w-20"
                />
                <CompactField
                  label="Нетто, кг"
                  value={product.netWeight}
                  onChange={(v) =>
                    handleProductChange(product.id, "netWeight", v)
                  }
                  type="number"
                  className="w-20"
                />
                <CompactField
                  label="Стоимость, $"
                  value={product.cost}
                  onChange={(v) =>
                    handleProductChange(product.id, "cost", v)
                  }
                  type="number"
                  className="w-24"
                />
                {products.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProduct(product.id)}
                    className="flex-shrink-0 text-red-600 hover:text-red-700 text-xs font-medium px-2 py-1"
                    title="Удалить"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addProduct}
              className="py-1.5 px-4 border-2 border-blue-600 text-blue-600 text-xs font-medium rounded hover:bg-blue-50 transition-colors inline-flex items-center gap-1.5 min-w-[140px]"
            >
              <span className="text-base">+</span>
              <span>Добавить товар</span>
            </button>
          </div>

          <div className="border-t border-gray-200 pt-3 space-y-3">
            <SelectField
              label="Экспортная лицензия у поставщика"
              value={formData.exportLicense}
              onChange={(v) => handleChange("exportLicense", v)}
              options={[
                { value: "", label: "Выберите..." },
                { value: "есть", label: "Есть" },
                { value: "отсутствует", label: "Отсутствует" },
              ]}
            />

            <SelectField
              label="Способы оплаты за белую доставку"
              value={formData.paymentForm}
              onChange={(v) => handleChange("paymentForm", v)}
              options={[
                { value: "", label: "Выберите..." },
                { value: "наличная оплата", label: "Наличная оплата" },
                { value: "безналичная оплата", label: "Безналичная оплата" },
              ]}
            />

            <FormField
              label="Пожелания по срокам доставки"
              value={formData.deliveryWishes}
              onChange={(v) => handleChange("deliveryWishes", v)}
            />
          </div>

          <button
            type="button"
            onClick={downloadExcel}
            className="py-1.5 px-4 border-2 border-green-600 text-green-600 text-xs font-medium rounded hover:bg-green-50 transition-colors min-w-[140px]"
          >
            Скачать Excel
          </button>
        </form>
      </main>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

function CompactField({
  label,
  value,
  onChange,
  type = "text",
  className = "",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <label className="text-[10px] font-medium text-gray-600 leading-tight">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-1.5 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent bg-white"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
