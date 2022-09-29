import { ThemeProvider } from "styled-components";

import { Container, CategoryItem, ValueItem } from "./styles";
import { themeCategory } from "./themeCategory";

interface ICATEGORY {
  category: string;
  type: string;
  title: string;
  value: string;
  date: string;
}

export function TransactionItem({ ...props }: ICATEGORY) {
  const { category, type, title, value, date } = props;

  return (
    <Container>
      <div>
        {themeCategory(category)?.icone}
        <strong>{title}</strong>
        <span>{date}</span>
      </div>
      <ThemeProvider theme={{ bgType: themeCategory(category)?.item }}>
        <div>
          <CategoryItem isColor={category}>
            {themeCategory(category)?.text}
          </CategoryItem>
          <ValueItem isactive={type === "deposit"}>{value}</ValueItem>
        </div>
      </ThemeProvider>
    </Container>
  );
}
