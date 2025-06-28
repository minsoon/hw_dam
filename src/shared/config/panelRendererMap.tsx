import { CheckboxGroupPanelProps, PanelItemsProps, PanelRendererWithAsset } from '@/shared/types/editPanel'
import {
  CheckboxEditPanel,
  CheckboxGroupEditPanel,
  ContactsEditPanel,
  CopyrightEditPanel,
  RadioEditPanel,
  SelectEditPanel,
  TagEditPanel,
} from '@/shared/ui/editPanel/assetEditPanel'

export const panelRendererMap: PanelRendererWithAsset = {
  tag: (props: PanelItemsProps) => {
    return <TagEditPanel {...props} />
  },
  select: (props: PanelItemsProps) => <SelectEditPanel {...props} />,
  radio: (props: PanelItemsProps) => <RadioEditPanel {...props} />,
  checkbox: (props: PanelItemsProps) => <CheckboxEditPanel {...props} />,
  checkboxGroup: (props: CheckboxGroupPanelProps) => <CheckboxGroupEditPanel {...props} />,
  contacts: (props: PanelItemsProps) => <ContactsEditPanel {...props} />,
  copyright: (props: PanelItemsProps) => <CopyrightEditPanel {...props} />,
}
