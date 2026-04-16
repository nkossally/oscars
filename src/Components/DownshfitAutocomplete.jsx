import * as React from "react";
import { useCombobox } from "downshift";

export const DownshfitAutocomplete = ({ handleSelect, years }) => {
  const [inputItems, setInputItems] = React.useState(years);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: inputItems,

    // 🔥 THIS is what you need
    onSelectedItemChange: ({ selectedItem }) => {
      if (selectedItem != null) {
        handleSelect(selectedItem);
      }
    },

    onInputValueChange: ({ inputValue = "" }) => {
      setInputItems(
        years.filter((item) => item.toString().includes(inputValue)),
      );
    },
  });

  return (
    <div className={"autocomplete-container"}>
      <input
        placeholder="Search years..."
        {...getInputProps()}
        className="autocomplete-input"
      />

      <ul
        {...getMenuProps()}
        className={"autocomplete-list"}
      >
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              key={item}
              {...getItemProps({ item, index })}
              style={{
                padding: "8px",
                color: "black",
                backgroundColor:
                  highlightedIndex === index ? "#bde4ff" : "white",
                cursor: "pointer",
                border: "1px solid #445366",
              }}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  );
};
