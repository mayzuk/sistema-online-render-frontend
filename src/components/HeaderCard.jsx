import React from 'react'
import { motion } from 'framer-motion'

export default function HeaderCard({title, children, className=''}) {
  return (
    <motion.div initial={{ y:8, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ duration:0.35 }} className={`bg-white p-6 rounded-xl shadow ${className}`}>
      {title && <h3 className="text-lg font-semibold mb-3">{title}</h3>}
      {children}
    </motion.div>
  )
}
