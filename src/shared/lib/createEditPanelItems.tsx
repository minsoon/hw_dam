import { panelRendererMap } from '@/shared/config/panelRendererMap'
import { AssetEditPanelKey, PanelItemsProps } from '@/shared/types/editPanel'
import { PanelTitle } from '@/shared/ui/editPanel/assetEditPanel'
import { renderEditPanelContent } from './renderEditPanelContent'

export const createEditPanelItems = (panelItems: PanelItemsProps[], isImageType?: boolean) => {
  return panelItems
    .map(panel => {
      const renderPanel = panelRendererMap[panel.type as AssetEditPanelKey]
      const children = renderEditPanelContent(panel, renderPanel)

      if (!children) return null

      return {
        key: panel.id,
        label: <PanelTitle panel={panel} isImageType={isImageType} />,
        children,
      }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
}
