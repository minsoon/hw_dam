import { ThemeConfig } from 'antd'

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#F4731F',
    colorInfo: '#F4731F',
    colorLink: '#000000',
    borderRadius: 4,
    wireframe: false,
    colorError: '#FF4E4E',
    colorSuccess: '#2DA85E',
    colorWarning: '#F1C40F',
    colorPrimaryBgHover: '#f89b5c',
    fontFamily: "'Noto Sans', sans-serif",
    colorText: '#000000',
    colorBorder: '#d1d1d1',
  },
  components: {
    Button: {
      borderRadius: 4,
      borderRadiusLG: 2,
      borderRadiusSM: 2,
      controlHeightLG: 48,
      controlHeight: 40,
      controlHeightSM: 32,
      onlyIconSizeLG: 32,
      onlyIconSize: 24,
      onlyIconSizeSM: 20,
      paddingInlineLG: 12,
      paddingInline: 12,
      paddingInlineSM: 8,
      paddingBlock: 12,
      paddingBlockLG: 12,
      paddingBlockSM: 8,
      fontWeight: 500,
    },
    Dropdown: {
      boxShadowSecondary: '0px 2px 20px 0px #00000033',
      controlItemBgHover: '#F1F1F1',
      colorText: '#000000',
      borderRadius: 4,
    },
    Tooltip: {
      colorBgSpotlight: '#fff',
      colorTextLightSolid: '#5c5c5c',
      boxShadowSecondary: '0 1px 4px rgba(0, 0, 0, 0.3)',
      borderRadius: 4,
      sizePopupArrow: 0,
    },
    Input: {
      controlHeight: 40,
    },
    Select: {
      controlHeight: 40,
    },
    Checkbox: {
      size: 20,
    },
    Radio: {
      size: 20,
    },
    Form: {
      itemMarginBottom: 0,
    },
  },
}
