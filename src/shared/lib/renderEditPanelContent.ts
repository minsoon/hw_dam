import {
  AssetEditPanelKey,
  CheckboxGroupPanelProps,
  PanelGroupData,
  PanelItemsProps,
  PanelRendererWithAsset,
} from '@/shared/types/editPanel'

export const renderEditPanelContent = (
  panel: PanelItemsProps,
  renderPanel: PanelRendererWithAsset[AssetEditPanelKey] | undefined
): JSX.Element | null => {
  if (!renderPanel) return null

  switch (panel.type) {
    case 'checkboxGroup':
      return (renderPanel as (props: CheckboxGroupPanelProps) => JSX.Element)({
        panelData: panel.data as PanelGroupData[],
      })
    case 'tag':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
    case 'select':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
    case 'productModel':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
    case 'productSegment':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
    case 'radio':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
    case 'checkbox':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
    case 'contacts':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
    case 'copyright':
      return (renderPanel as (props: PanelItemsProps) => JSX.Element)(panel)
  }
}
