import React, { useState } from 'react';
import { ToolLayout, Card } from '../ToolShared';
import { FileText, Upload } from 'lucide-react';

export default function XmlViewer({ onBack }: { onBack: () => void }) {
    const [xmlContent, setXmlContent] = useState('');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setXmlContent(event.target?.result as string || '');
            };
            reader.readAsText(file);
        }
    };

    return (
        <ToolLayout
            title="Visualizador XML"
            description="Visualize e analise arquivos XML de NF-e, CT-e e outros documentos fiscais"
            onBack={onBack}
        >
            <div className="space-y-6">
                <Card title="Upload de Arquivo">
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 text-center hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors">
                        <input
                            type="file"
                            accept=".xml"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="xml-upload"
                        />
                        <label htmlFor="xml-upload" className="cursor-pointer">
                            <Upload size={48} className="mx-auto mb-4 text-slate-400" />
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                                Clique para selecionar arquivo XML
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                Suporta NF-e, CT-e, MDF-e e outros XMLs fiscais
                            </p>
                        </label>
                    </div>
                </Card>

                {xmlContent && (
                    <Card title="Conteúdo do XML">
                        <div className="bg-slate-900 rounded-xl p-4 overflow-x-auto">
                            <pre className="text-xs text-green-400 font-mono">
                                {xmlContent}
                            </pre>
                        </div>
                    </Card>
                )}

                {!xmlContent && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 text-center">
                        <FileText size={64} className="mx-auto mb-4 text-blue-400 opacity-50" />
                        <p className="text-sm text-blue-800 dark:text-blue-200">
                            Faça upload de um arquivo XML para visualizar seu conteúdo
                        </p>
                    </div>
                )}
            </div>
        </ToolLayout>
    );
}
