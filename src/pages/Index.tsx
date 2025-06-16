import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, BoxIcon, GitBranch, Activity, TrendingUp, Zap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getAllFlows } from '@/data/flows';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const flows = getAllFlows();

  // Update scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              PT. Timah Industri
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Solusi Manajemen Diagram Alir Proses Bisnis yang Efisien dan Intuitif
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link to="/flow-editor">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Buka Editor Diagram <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Pelajari Lebih Lanjut
              </Button>
            </div>
            
            {/* Flow links */}
            <div className="mt-12 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Diagram Alir Proses Bisnis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {flows.map(flow => (
                  <Link 
                    key={flow.id}
                    to={`/${flow.id}`} 
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div>
                      <h4 className="font-medium text-gray-900">{flow.title}</h4>
                      <p className="text-sm text-gray-500">{flow.description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-500">
          <p className="mb-2 text-sm">Scroll untuk melihat fitur</p>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-10 border-2 border-gray-400 rounded-full flex justify-center"
          >
            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section with Scroll Animation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate={scrollY > 300 ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fitur Unggulan</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kelola diagram alir proses bisnis dengan mudah menggunakan tools canggih kami
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            animate={scrollY > 400 ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8"
          >
            {/* Feature 1 */}
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <BoxIcon className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Editor Diagram Intuitif</h3>
              <p className="text-gray-600">
                Buat dan edit diagram alir dengan antarmuka drag-and-drop yang intuitif dan responsif.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Elemen Proses Bisnis</h3>
              <p className="text-gray-600">
                Akses berbagai elemen diagram seperti terminator, proses, keputusan, dan dokumen.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Analisis Proses</h3>
              <p className="text-gray-600">
                Visualisasikan dan analisis alur kerja untuk mengidentifikasi area perbaikan.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Manajemen Versi</h3>
              <p className="text-gray-600">
                Simpan dan kelola versi diagram alir proses untuk melacak perubahan dari waktu ke waktu.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Optimasi Proses</h3>
              <p className="text-gray-600">
                Identifikasi bottleneck dan optimalkan alur kerja dengan visualisasi yang jelas.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div variants={fadeInUp} className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Ekspor & Berbagi</h3>
              <p className="text-gray-600">
                Ekspor diagram dalam berbagai format dan bagikan dengan mudah kepada semua stakeholder.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            animate={scrollY > 800 ? "visible" : "hidden"}
            variants={fadeInUp}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap untuk Mengelola Proses Bisnis Anda?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Mulai buat diagram alir proses bisnis yang efisien dan terstruktur sekarang.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link to="/flow-editor">
                <Button className="bg-white text-blue-700 hover:bg-blue-50">
                  Mulai Sekarang <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/embed-generator">
                <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Generator Embed
                </Button>
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {flows.slice(0, 3).map(flow => (
                <Link key={flow.id} to={`/${flow.id}`}>
                  <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    {flow.title}
                  </Button>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-600">
            <p>© {new Date().getFullYear()} PT. Timah Industri. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
