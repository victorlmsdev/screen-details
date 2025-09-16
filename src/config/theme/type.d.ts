import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      background: string;
      onBackground: string;
      success: string;
      inactive: string;
      error: string;
      link: string;
      buttonRipple: string;
    };
    fontSize: {
      body: number;
      title: number;
      subtitle: number;
      caption: number;
      button: number;
      megaTitle: number;
      sectionTitle: number;
      sectionBody: number;
    };
    font: {
      button: string;
      title: string;
      subtitle: string;
      megaTitle: string;
      sectionTitle: string;
      default: string;
    };
  }
}
