// DO NOT POLLUTE WITH SERVER CODE

import { nodes as AudioNodes } from './audio/nodes'
import { nodes as DocumentNodes } from './docs/nodes'
import { nodes as ImageNodes } from './image/nodes'

export const formats = [...ImageNodes, ...AudioNodes, ...DocumentNodes]
