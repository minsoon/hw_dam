export type AssetEditPanelKey =
  | 'tag'
  | 'select'
  | 'productModel'
  | 'productSegment'
  | 'checkbox'
  | 'checkboxGroup'
  | 'radio'
  | 'contacts'
  | 'copyright'

export type ViewType = 'edit' | 'upload'
export interface PanelData {
  id: number
  value: string
  is_selected?: number
  is_new?: number
}

export interface PanelGroupData {
  title: string
  data: PanelData[]
}

export interface PanelItemsProps {
  id: number
  title: string
  type: AssetEditPanelKey
  data: PanelData[] | []
  viewType: ViewType
}

export interface CheckboxGroupPanelProps {
  panelData: PanelGroupData[]
}

export interface PanelRendererWithAsset {
  tag: (props: PanelItemsProps) => JSX.Element
  select: (props: PanelItemsProps) => JSX.Element
  productModel: (props: PanelItemsProps) => JSX.Element
  productSegment: (props: PanelItemsProps) => JSX.Element
  radio: (props: PanelItemsProps) => JSX.Element
  checkbox: (props: PanelItemsProps) => JSX.Element
  checkboxGroup: (props: CheckboxGroupPanelProps) => JSX.Element
  contacts: (props: PanelItemsProps) => JSX.Element
  copyright: (props: PanelItemsProps) => JSX.Element
}
