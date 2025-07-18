'use client'

import { useCallback } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DndContext, DragEndEvent, PointerSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { v4 as uuidv4 } from 'uuid'
import { VariationItem } from '@/features/settings/asset/model/types'
import { useSettingAssetStore } from '@/features/settings/asset/model/useAssetStore'
import SortableRow from './SortableRow'
import styles from './upsert.module.scss'

const CustomVariations = () => {
  const { customVariations: items, setCustomVariations: setItems, detail } = useSettingAssetStore()
  const isAuto = detail?.default_type === 'Auto'
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || active.id === over.id) return

      const oldIndex = items.findIndex(i => i.id === active.id)
      const newIndex = items.findIndex(i => i.id === over.id)
      setItems(arrayMove(items, oldIndex, newIndex))
    },
    [items, setItems]
  )

  const handleAdd = useCallback(() => {
    const newVariation = { id: uuidv4(), name: '', file_type: [] }
    setItems([...items, newVariation])
  }, [items, setItems])

  const handleRemove = useCallback(
    (id: string) => {
      if (items.length > 1) {
        const updatedItems = items.filter(item => item.id !== id)
        setItems(updatedItems)
      }
    },
    [items, setItems]
  )

  const handleChange = useCallback(
    (id: string, field: keyof VariationItem, value: string | string[] | number) => {
      const updatedItems = items.map(item => (item.id === id ? { ...item, [field]: value } : item))
      setItems(updatedItems)
    },
    [items, setItems]
  )

  return (
    <div className={`${styles.customVariations} ${isAuto ? styles.disabled : ''}`}>
      <div className={styles.title}>Custom variations</div>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
          <table>
            <colgroup>
              <col style={{ width: 30 }} />
              <col style={{ width: 30 }} />
              <col />
              <col style={{ width: 358 }} />
              <col style={{ width: 50 }} />
            </colgroup>
            <thead>
              <tr>
                <td></td>
                <th>WF</th>
                <th>Name</th>
                <th>File type</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <SortableRow key={item.id} item={item} onRemove={handleRemove} onChange={handleChange} />
              ))}
            </tbody>
          </table>
        </SortableContext>
      </DndContext>
      <Button icon={<PlusOutlined />} onClick={handleAdd} style={{ marginTop: 16 }} disabled={isAuto}>
        Add variations
      </Button>
    </div>
  )
}

export default CustomVariations
