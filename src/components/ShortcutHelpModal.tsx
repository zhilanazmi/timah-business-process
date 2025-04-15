import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Keyboard, MousePointer, Info, Undo, Redo, ArrowDownToLine, FileUp, FileDown, ZoomIn, ZoomOut, Monitor, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShortcutHelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type Category = "keyboard" | "mouse";

const ShortcutHelpModal = ({ open, onOpenChange }: ShortcutHelpModalProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>("keyboard");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const shortcuts = [
    { key: "Ctrl + Z", description: "Undo perubahan terakhir", icon: <Undo size={14} /> },
    { key: "Ctrl + Shift + Z / Ctrl + Y", description: "Redo perubahan", icon: <Redo size={14} /> },
    { key: "Ctrl + E", description: "Export diagram", icon: <FileUp size={14} /> },
    { key: "Ctrl + I", description: "Import diagram", icon: <FileDown size={14} /> },
    { key: "Ctrl + S", description: "Simpan sebagai gambar", icon: <ArrowDownToLine size={14} /> },
    { key: "Delete", description: "Hapus node/edge yang dipilih", icon: <X size={14} /> },
    { key: "Escape", description: "Batalkan pemilihan", icon: <X size={14} /> },
    { key: "Ctrl + 0", description: "Reset zoom", icon: <Monitor size={14} /> },
    { key: "Ctrl + ?", description: "Tampilkan bantuan shortcut", icon: <Info size={14} /> },
  ];

  const mouseActions = [
    { action: "Klik kiri pada node", description: "Pilih node" },
    { action: "Klik kanan pada node", description: "Menu konteks node" },
    { action: "Drag dari handle ke handle", description: "Buat koneksi" },
    { action: "Drag node", description: "Pindahkan node" },
    { action: "Drag latar", description: "Pindahkan viewport" },
    { action: "Scroll mouse", description: "Zoom in/out" },
  ];

  const fadeInAnimation = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.1 
      } 
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] md:max-w-[650px] p-0 rounded-xl border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInAnimation}
          className="flex flex-col h-full max-h-[85vh] overflow-hidden"
        >
          <DialogHeader className="p-4 lg:p-6 border-b border-gray-100 dark:border-gray-700 sticky top-0 z-10 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
            <DialogTitle className="text-xl md:text-2xl flex items-center gap-2 text-blue-700 dark:text-blue-400">
              <Info className="h-5 w-5" />
              Bantuan Shortcut
            </DialogTitle>
            
            <div className="flex mt-3 md:mt-4 space-x-2 p-1 rounded-lg bg-gray-100 dark:bg-gray-800 w-fit">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveCategory("keyboard")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-all",
                  activeCategory === "keyboard" 
                    ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                <Keyboard className="mr-2 h-4 w-4" />
                Keyboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveCategory("mouse")}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm transition-all",
                  activeCategory === "mouse" 
                    ? "bg-white dark:bg-gray-700 text-emerald-700 dark:text-emerald-400 shadow-sm" 
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                <MousePointer className="mr-2 h-4 w-4" />
                Mouse
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <AnimatePresence mode="wait">
              {activeCategory === "keyboard" ? (
                <motion.div
                  key="keyboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center mb-4">
                    <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 hover:bg-indigo-100">
                      <Keyboard className="h-3.5 w-3.5 mr-1" />
                      Keyboard Shortcuts
                    </Badge>
                  </div>
                  
                  <motion.div 
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible"
                    className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-indigo-100 dark:border-indigo-900 overflow-hidden"
                  >
                    {shortcuts.map((shortcut, index) => (
                      <motion.div 
                        key={index}
                        variants={itemAnimation}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`flex items-center justify-between p-3 md:p-4 border-b last:border-b-0 border-indigo-50 dark:border-gray-700 transition-colors duration-150 ${
                          hoveredItem === index 
                            ? 'bg-indigo-50/80 dark:bg-indigo-900/30' 
                            : 'hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-gray-700 dark:text-gray-300">{shortcut.description}</span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/50 rounded-md border border-indigo-200 dark:border-indigo-700 shadow-sm"
                        >
                          <motion.span 
                            animate={{ 
                              scale: hoveredItem === index ? [1, 1.1, 1] : 1,
                              transition: { repeat: 0, duration: 0.5 }
                            }}
                            className="mr-1"
                          >
                            {shortcut.icon}
                          </motion.span>
                          {shortcut.key}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="mouse"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  <div className="flex items-center mb-4">
                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 hover:bg-emerald-100">
                      <MousePointer className="h-3.5 w-3.5 mr-1" />
                      Mouse Actions
                    </Badge>
                  </div>
                  
                  <motion.div 
                    variants={containerAnimation}
                    initial="hidden"
                    animate="visible"
                    className="bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg shadow-sm border border-emerald-100 dark:border-emerald-900 overflow-hidden"
                  >
                    {mouseActions.map((action, index) => (
                      <motion.div 
                        key={index}
                        variants={itemAnimation}
                        onMouseEnter={() => setHoveredItem(index)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className={`flex items-center justify-between p-3 md:p-4 border-b last:border-b-0 border-emerald-50 dark:border-gray-700 transition-colors duration-150 ${
                          hoveredItem === index 
                            ? 'bg-emerald-50/80 dark:bg-emerald-900/30' 
                            : 'hover:bg-emerald-50/50 dark:hover:bg-emerald-900/20'
                        }`}
                      >
                        <div className="flex items-center">
                          <span className="text-gray-700 dark:text-gray-300">{action.description}</span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className="flex items-center px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50 rounded-md border border-emerald-200 dark:border-emerald-700 shadow-sm"
                        >
                          {action.action}
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ShortcutHelpModal;
