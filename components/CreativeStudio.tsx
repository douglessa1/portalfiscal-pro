import React, { useState, useRef } from 'react';
import { Image as ImageIcon, Wand2, Download, Eraser, Loader2 } from 'lucide-react';
import { generateFiscalImage, editChartImage } from '../services/gemini';
import { AspectRatio } from '../types';

export const CreativeStudio: React.FC = () => {
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  
  // Creation State
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Edit State
  const [editPrompt, setEditPrompt] = useState('');
  const [imageToEdit, setImageToEdit] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatios: AspectRatio[] = ["1:1", "3:4", "4:3", "9:16", "16:9"];

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    const result = await generateFiscalImage(prompt, aspectRatio);
    setGeneratedImage(result);
    setIsGenerating(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageToEdit(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
      if(!imageToEdit || !editPrompt) return;
      setIsEditing(true);
      const result = await editChartImage(imageToEdit, editPrompt);
      if(result) {
          setImageToEdit(result); // Update displayed image with result
      }
      setIsEditing(false);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar Controls */}
      <div className="lg:col-span-1 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col h-full overflow-y-auto transition-colors">
        <div className="flex items-center gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-700 rounded-lg">
          <button 
            onClick={() => setMode('create')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'create' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            <ImageIcon size={16} /> Criar Post
          </button>
          <button 
            onClick={() => setMode('edit')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${mode === 'edit' ? 'bg-white dark:bg-slate-600 text-emerald-600 dark:text-emerald-400 shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
          >
            <Eraser size={16} /> Editar
          </button>
        </div>

        {mode === 'create' ? (
          <div className="space-y-6">
             <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Prompt (Descrição)</label>
                <textarea 
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Um contador moderno analisando hologramas de dados financeiros..."
                    className="w-full h-32 p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none placeholder-slate-400 dark:placeholder-slate-500"
                />
             </div>

             <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Formato</label>
                <div className="grid grid-cols-3 gap-2">
                    {aspectRatios.map((ratio) => (
                        <button
                            key={ratio}
                            onClick={() => setAspectRatio(ratio)}
                            className={`py-2 text-xs font-medium rounded border transition-colors ${aspectRatio === ratio ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-500'}`}
                        >
                            {ratio}
                        </button>
                    ))}
                </div>
             </div>

             <button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt}
                className="w-full py-3 bg-emerald-600 text-white rounded-lg font-bold shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
             >
                {isGenerating ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                Gerar Imagem
             </button>
          </div>
        ) : (
          <div className="space-y-6">
             <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Upload Imagem</label>
                <input 
                    type="file" 
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-500 dark:text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 dark:file:bg-emerald-900/30 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900/50"
                />
             </div>

             <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Instrução de Edição</label>
                <textarea 
                    value={editPrompt}
                    onChange={(e) => setEditPrompt(e.target.value)}
                    placeholder="Adicione um filtro azul, remova o fundo..."
                    className="w-full h-32 p-3 border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none resize-none placeholder-slate-400 dark:placeholder-slate-500"
                />
             </div>

             <button
                onClick={handleEdit}
                disabled={isEditing || !imageToEdit || !editPrompt}
                className="w-full py-3 bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-200 dark:shadow-none hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
             >
                {isEditing ? <Loader2 className="animate-spin" size={20} /> : <Eraser size={20} />}
                Editar com IA
             </button>
          </div>
        )}
      </div>

      {/* Main Canvas Area */}
      <div className="lg:col-span-2 bg-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden group border border-slate-800">
         <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black pointer-events-none"></div>
         
         {(generatedImage || imageToEdit) ? (
             <div className="relative max-w-full max-h-full p-8">
                 <img 
                    src={mode === 'create' ? generatedImage! : imageToEdit!} 
                    alt="Work area" 
                    className="max-w-full max-h-[70vh] rounded shadow-2xl object-contain"
                 />
                 <div className="absolute bottom-12 right-12 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a 
                        href={mode === 'create' ? generatedImage! : imageToEdit!}
                        download="portal-fiscal-asset.png"
                        className="p-3 bg-white text-slate-900 rounded-full shadow-lg hover:bg-emerald-50 transition-colors"
                    >
                        <Download size={20} />
                    </a>
                 </div>
             </div>
         ) : (
             <div className="text-center text-slate-600">
                <ImageIcon size={64} className="mx-auto mb-4 opacity-20" />
                <p>Seu espaço criativo está vazio.</p>
             </div>
         )}
      </div>
    </div>
  );
};