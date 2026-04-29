import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  ShieldCheck, 
  Send, 
  Plus, 
  Minus,
  Trash2, 
  CheckCircle2, 
  Palette, 
  Building2, 
  LayoutDashboard, 
  Phone,
  Star, 
  Quote, 
  ShoppingCart, 
  X, 
  Check, 
  Sparkles,
  Info,
  ExternalLink,
  Image as ImageIcon,
  Upload,
  Link as LinkIcon,
  Cpu,
  Camera
} from 'lucide-react';

export default function App() {
  const [step, setStep] = useState('editor');
  const [config, setConfig] = useState({
    businessName: 'Soluções Pro Elite',
    whatsapp: '5511999999999',
    primaryColor: '#0f172a',
    logoUrl: '', 
    tagline: 'Liderança técnica e confiança absoluta em cada entrega.',
    services: [
      { id: 1, name: 'Manutenção Preventiva', price: '350,00', imageUrl: '' },
      { id: 2, name: 'Instalação de Sistemas', price: '890,00', imageUrl: '' }
    ]
  });

  const editorThemeColor = '#0f172a';

  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceImage, setServiceImage] = useState('');
  const [logoMode, setLogoMode] = useState('link');
  const [serviceImageMode, setServiceImageMode] = useState('link');
  
  const logoInputRef = useRef(null);
  const serviceImageInputRef = useRef(null);

  const smartTestimonials = useMemo(() => {
    const authors = ["Ricardo Santos", "Mariana Costa", "Carlos Eduardo", "Patrícia Lima", "André Oliveira"];
    const roles = ["Diretor Executivo", "Gestora de Projetos", "Proprietário", "Coordenadora", "Cliente VIP"];
    
    if (config.services.length === 0) {
      return [{ id: 0, author: "Visitante", role: "Cliente", text: "Aguardando novos serviços para gerar avaliações." }];
    }

    return config.services.slice(0, 5).map((service, index) => {
      const templates = [
        `O serviço de ${service.name} superou todas as expectativas. Profissionalismo impecável.`,
        `Contratei a ${service.name} e fiquei impressionado com a agilidade e o rigor técnico da equipe.`,
        `Melhor investimento que fiz este ano foi em ${service.name}. Atendimento nota 10.`,
        `A precisão na execução do serviço de ${service.name} demonstra o nível de elite desta empresa.`,
        `Extremamente satisfeito com o resultado final da ${service.name}. Recomendo sem hesitar.`
      ];
      return {
        id: service.id + index,
        author: authors[index % authors.length],
        role: roles[index % roles.length],
        text: templates[index % templates.length]
      };
    });
  }, [config.services]);

  const updateConfig = (field, value) => {
    setConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateConfig('logoUrl', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleServiceImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setServiceImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddService = (e) => {
    e.preventDefault();
    if (serviceName.trim() && servicePrice.trim()) {
      const newService = { 
        id: Date.now(), 
        name: serviceName, 
        price: servicePrice,
        imageUrl: serviceImage.trim() 
      };
      updateConfig('services', [...config.services, newService]);
      setServiceName('');
      setServicePrice('');
      setServiceImage('');
    }
  };

  const removeService = (id) => {
    updateConfig('services', config.services.filter(s => s.id !== id));
  };

  if (step === 'portal') {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-slate-100 z-50 p-4 flex justify-between items-center px-4 lg:px-16">
          <div className="flex items-center gap-2" style={{ color: config.primaryColor }}>
            <ShieldCheck size={24} className="shrink-0" />
            <span className="font-black text-[10px] sm:text-sm tracking-tighter uppercase truncate">Ambiente Blindado BJC</span>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button onClick={() => setStep('editor')} className="text-[9px] sm:text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest">Sair</button>
            <button 
              onClick={() => alert("Simulação: Site publicado com sucesso!")}
              style={{ backgroundColor: config.primaryColor }}
              className="text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black shadow-lg uppercase tracking-wider whitespace-nowrap"
            >Publicar Agora</button>
          </div>
        </nav>
        <div className="pt-24 pb-20 px-4 sm:px-0">
          <PortalView data={config} testimonials={smartTestimonials} isFull={true} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col lg:flex-row font-sans">
      <aside className="w-full lg:w-[450px] bg-white border-r border-slate-200 p-6 lg:p-8 overflow-y-auto lg:max-h-screen shadow-sm z-30">
        <div className="mb-8 pb-8 border-b border-slate-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl text-white shadow-2xl rotate-3 shrink-0" style={{ backgroundColor: editorThemeColor }}>
              <Cpu size={28} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl lg:text-2xl font-black text-slate-900 leading-none tracking-tighter uppercase">BJC Web Engine</h1>
                <span className="bg-emerald-100 text-emerald-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">v2.5 PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1 italic">Console de Desenvolvimento Profissional</p>
            </div>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
              Configure os parâmetros do seu <span className="font-bold text-slate-800">Site de Vendas</span>. O sistema gera uma interface otimizada para conversão via WhatsApp.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Building2 size={14} /> Definições de Negócio
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Nome Corporativo</label>
                <input 
                  type="text" 
                  placeholder="Ex: Empresa de Engenharia LTDA"
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-bold focus:ring-2 focus:ring-slate-200 transition-all"
                  value={config.businessName}
                  onChange={(e) => updateConfig('businessName', e.target.value)}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Linha de Contacto Direta</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text" 
                    placeholder="Somente números com DDD"
                    className="w-full p-4 pl-12 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm font-bold focus:ring-2 focus:ring-slate-200 transition-all"
                    value={config.whatsapp}
                    onChange={(e) => updateConfig('whatsapp', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Assinatura Visual (Logo)</label>
                <div className="bg-slate-50 p-2 rounded-2xl border border-slate-100">
                  <div className="flex gap-2 mb-3">
                    <button 
                      onClick={() => setLogoMode('link')}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${logoMode === 'link' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                    >
                      <LinkIcon size={12}/> Link URL
                    </button>
                    <button 
                      onClick={() => setLogoMode('upload')}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${logoMode === 'upload' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                    >
                      <Upload size={12}/> Local
                    </button>
                  </div>

                  {logoMode === 'link' ? (
                    <div className="relative">
                      <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="text" 
                        placeholder="Cole o link da logo aqui"
                        className="w-full p-3 pl-12 bg-white border border-slate-200 rounded-xl outline-none text-xs font-bold focus:ring-2 focus:ring-slate-100 transition-all"
                        value={config.logoUrl.startsWith('data:') ? '' : config.logoUrl}
                        onChange={(e) => updateConfig('logoUrl', e.target.value)}
                      />
                    </div>
                  ) : (
                    <div 
                      onClick={() => logoInputRef.current.click()}
                      className="w-full p-4 bg-white border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-400 transition-colors"
                    >
                      <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                      {config.logoUrl.startsWith('data:') ? (
                        <div className="flex items-center gap-3">
                          <img src={config.logoUrl} className="w-8 h-8 rounded-lg object-cover" />
                          <span className="text-[10px] font-bold text-slate-500 italic">Logo Carregada</span>
                        </div>
                      ) : (
                        <>
                          <Upload size={20} className="text-slate-300" />
                          <span className="text-[10px] font-black text-slate-400 uppercase">Escolher Foto</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Slogan de Autoridade</label>
                <textarea 
                  placeholder="Escreva uma frase de impacto..."
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm h-20 resize-none focus:ring-2 focus:ring-slate-200 transition-all font-medium"
                  value={config.tagline}
                  onChange={(e) => updateConfig('tagline', e.target.value)}
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Palette size={14} /> Estética da Interface
            </h2>
            <div className="flex flex-wrap gap-3">
              {['#0f172a', '#1e40af', '#065f46', '#991b1b', '#d97706', '#7c3aed', '#111827'].map(color => (
                <button
                  key={color}
                  onClick={() => updateConfig('primaryColor', color)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${config.primaryColor === color ? 'border-slate-900 scale-110 shadow-lg' : 'border-white'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <LayoutDashboard size={14} /> Catálogo de Serviços
            </h2>
            <form onSubmit={handleAddService} className="p-6 bg-slate-900 rounded-[2rem] shadow-2xl mb-6 relative">
              <div className="space-y-3 mb-4">
                <input 
                  type="text" 
                  placeholder="Identificação do Serviço" 
                  className="w-full bg-slate-800 text-white text-xs p-4 rounded-xl border border-slate-700 outline-none"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                />
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-bold">R$</span>
                  <input 
                    type="text" 
                    placeholder="Valor (Ex: 150,00)" 
                    className="w-full bg-slate-800 text-white text-xs p-4 pl-10 rounded-xl border border-slate-700 outline-none"
                    value={servicePrice}
                    onChange={(e) => setServicePrice(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="bg-slate-800 p-2 rounded-2xl border border-slate-700 mb-4">
                <div className="flex gap-2 mb-3">
                  <button 
                    type="button"
                    onClick={() => setServiceImageMode('link')}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${serviceImageMode === 'link' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'}`}
                  >
                    <LinkIcon size={12}/> Link
                  </button>
                  <button 
                    type="button"
                    onClick={() => setServiceImageMode('upload')}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center justify-center gap-2 ${serviceImageMode === 'upload' ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500'}`}
                  >
                    <Upload size={12}/> Foto
                  </button>
                </div>

                {serviceImageMode === 'link' ? (
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="URL da Imagem do Produto"
                      className="w-full p-3 pl-12 bg-slate-900 border border-slate-700 rounded-xl outline-none text-[11px] text-white font-bold focus:ring-1 focus:ring-slate-600 transition-all"
                      value={serviceImage.startsWith('data:') ? '' : serviceImage}
                      onChange={(e) => setServiceImage(e.target.value)}
                    />
                  </div>
                ) : (
                  <div 
                    onClick={() => serviceImageInputRef.current.click()}
                    className="w-full p-4 bg-slate-900 border-2 border-dashed border-slate-700 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-slate-500 transition-colors"
                  >
                    <input type="file" ref={serviceImageInputRef} className="hidden" accept="image/*" onChange={handleServiceImageUpload} />
                    {serviceImage.startsWith('data:') ? (
                      <div className="flex items-center gap-3">
                        <img src={serviceImage} className="w-8 h-8 rounded-lg object-cover" />
                        <span className="text-[10px] font-bold text-slate-400">Arquivo Pronto</span>
                      </div>
                    ) : (
                      <>
                        <Camera size={20} className="text-slate-600" />
                        <span className="text-[10px] font-black text-slate-500 uppercase">Tirar Foto</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button type="submit" className="w-full bg-white text-slate-900 py-3 rounded-xl font-black active:scale-95 transition-transform flex items-center justify-center gap-2 text-xs uppercase">
                <Plus size={18} /> Adicionar ao Catálogo
              </button>
            </form>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {config.services.map(service => (
                <div key={service.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-3">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} className="w-10 h-10 rounded-lg object-cover bg-slate-100" alt="" />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-300">
                        <ImageIcon size={16} />
                      </div>
                    )}
                    <div>
                      <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{service.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">R$ {service.price}</p>
                    </div>
                  </div>
                  <button onClick={() => removeService(service.id)} className="text-slate-200 hover:text-red-500 p-2 transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </section>

          <button 
            onClick={() => setStep('portal')}
            style={{ backgroundColor: editorThemeColor }}
            className="w-full text-white font-black py-5 rounded-[2rem] shadow-2xl hover:brightness-110 transition-all flex items-center justify-center gap-4 uppercase text-xs tracking-[0.2em] group"
          >
            GERAR PRÉVIA ESTRUTURAL <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </aside>

      <main className="flex-grow flex items-center justify-center p-4 lg:p-8 bg-slate-100 min-h-[800px] lg:min-h-0">
        <div className="relative scale-90 sm:scale-100">
          <div className="w-[320px] sm:w-[360px] h-[640px] sm:h-[740px] bg-white rounded-[3.5rem] shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] border-[10px] border-slate-900 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-3xl z-40"></div>
            <div className="h-full overflow-y-auto custom-scrollbar">
              <PortalView data={config} testimonials={smartTestimonials} />
            </div>
          </div>
          <div className="absolute -right-20 top-1/2 -rotate-90 hidden lg:block">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] opacity-50">Modo Simulação Ativo</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function PortalView({ data, testimonials, isFull }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toBRL = (val) => val.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const cartTotal = useMemo(() => {
    const total = cart.reduce((acc, item) => {
      const priceNum = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
      return acc + ((isNaN(priceNum) ? 0 : priceNum) * item.qty);
    }, 0);
    return toBRL(total);
  }, [cart]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonials.length > 0) {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const toggleCartItem = (service) => {
    const existing = cart.find(item => item.id === service.id);
    if (existing) {
      setCart(cart.filter(item => item.id !== service.id));
    } else {
      setCart([...cart, { ...service, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const finalizeOrder = () => {
    const itemsList = cart.map(item => {
      const unitPrice = parseFloat(item.price.replace(/\./g, '').replace(',', '.'));
      const subtotal = unitPrice * item.qty;
      return `• ${item.name}\n  Qtd: ${item.qty}x | Unit: R$ ${item.price} | Sub: R$ ${toBRL(subtotal)}`;
    }).join('\n\n');
    
    const message = `SOLICITAÇÃO DE ORÇAMENTO - ${data.businessName.toUpperCase()}\n\nOlá! Gostaria de orçar os seguintes itens:\n\n${itemsList}\n\n━━━━━━━━━━━━━━━\nTOTAL ACUMULADO: R$ ${cartTotal}\n━━━━━━━━━━━━━━━\n\nNo aguardo do retorno!`;
    
    window.open(`https://wa.me/${data.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <div className={`mx-auto bg-white min-h-full flex flex-col relative ${isFull ? 'max-w-xl shadow-2xl rounded-t-[3rem]' : ''}`}>
      
      {cart.length > 0 && (
        <button 
          onClick={() => setIsCartOpen(true)}
          style={{ backgroundColor: data.primaryColor }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 text-white ring-4 ring-white animate-bounce-subtle"
        >
          <ShoppingCart size={18} />
          <span className="text-[11px] font-black uppercase tracking-tighter">R$ {cartTotal} ({cart.reduce((a, b) => a + b.qty, 0)})</span>
        </button>
      )}

      <header className="pt-16 pb-12 px-6 sm:px-8 text-center border-b border-slate-50 relative">
        <div className="mb-6 relative inline-block">
          {data.logoUrl ? (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[1.8rem] overflow-hidden border-4 border-white shadow-2xl mx-auto ring-1 ring-slate-100">
                <img src={data.logoUrl} alt="Logo" className="w-full h-full object-cover" onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Logo'; }} />
            </div>
          ) : (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] sm:rounded-[1.8rem] mx-auto flex items-center justify-center shadow-xl relative group" style={{ backgroundColor: data.primaryColor }}>
              <span className="text-white font-black text-xl sm:text-2xl tracking-tighter">{getInitials(data.businessName)}</span>
              <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-xl shadow-lg">
                <ShieldCheck size={14} style={{ color: data.primaryColor }} />
              </div>
            </div>
          )}
        </div>
        
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 uppercase tracking-tighter mb-4 leading-none">{data.businessName}</h1>
        <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] italic max-w-[250px] mx-auto leading-relaxed">"{data.tagline}"</p>
      </header>

      <main className="px-6 sm:px-8 py-10 space-y-8 flex-grow">
        {data.services.map((service) => {
          const inCartItem = cart.find(item => item.id === service.id);
          return (
            <div 
              key={service.id}
              className={`w-full bg-white border-2 rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden transition-all duration-300 ${inCartItem ? 'shadow-xl' : 'border-slate-50 shadow-sm'}`}
              style={{ borderColor: inCartItem ? data.primaryColor : undefined }}
            >
              {service.imageUrl && (
                <div className="w-full h-36 sm:h-44 overflow-hidden bg-slate-100">
                  <img src={service.imageUrl} className="w-full h-full object-cover" alt={service.name} />
                </div>
              )}
              
              <div className="p-5 sm:p-7">
                <div className="flex justify-between items-start mb-6">
                   <div className="cursor-pointer" onClick={() => toggleCartItem(service)}>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tight">{service.name}</h4>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter mt-1">Alta Performance</p>
                   </div>
                   <button 
                    onClick={() => toggleCartItem(service)}
                    className={`p-2.5 sm:p-3 rounded-2xl shadow-lg transition-all ${inCartItem ? 'text-white' : 'bg-slate-50 text-slate-200'}`} 
                    style={{ backgroundColor: inCartItem ? data.primaryColor : undefined }}
                   >
                      {inCartItem ? <Check size={18} strokeWidth={3} /> : <Plus size={18} strokeWidth={3} />}
                   </button>
                </div>

                <div className="flex items-center justify-between border-t border-slate-50 pt-5">
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter"><span className="text-[10px] sm:text-xs font-bold text-slate-300 mr-1 italic">R$</span>{service.price}</div>
                  {inCartItem ? (
                    <div className="flex items-center gap-2 sm:gap-3 bg-slate-50 p-1.5 rounded-2xl">
                      <button onClick={() => updateQty(service.id, -1)} className="p-1.5 sm:p-2 bg-white rounded-xl shadow-sm text-slate-900"><Minus size={10}/></button>
                      <span className="text-xs sm:text-sm font-black text-slate-900 px-1">{inCartItem.qty}</span>
                      <button onClick={() => updateQty(service.id, 1)} className="p-1.5 sm:p-2 bg-slate-900 rounded-xl shadow-sm text-white"><Plus size={10}/></button>
                    </div>
                  ) : (
                    <button onClick={() => toggleCartItem(service)} style={{ backgroundColor: data.primaryColor }} className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[9px] sm:text-[10px] font-black text-white uppercase tracking-widest shadow-md active:scale-95 transition-all">Escolher</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>

      <section className="px-6 sm:px-8 py-10 sm:py-14 bg-slate-50 border-y border-slate-100 relative mt-auto">
        <div className="relative h-44 sm:h-40">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`absolute inset-0 transition-all duration-700 ${idx === activeTestimonial ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <div className="bg-white p-5 sm:p-6 rounded-[1.8rem] sm:rounded-[2rem] border border-slate-200 shadow-sm text-center">
                <p className="text-[10px] sm:text-[11px] font-medium text-slate-600 italic">"{t.text}"</p>
                <p className="text-[9px] sm:text-[10px] font-black text-slate-900 uppercase mt-4">{t.author}</p>
                <p className="text-[7px] sm:text-[8px] font-bold text-slate-400 uppercase">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="p-8 sm:p-12 text-center bg-white space-y-6">
        <div className="space-y-2">
          <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">© {new Date().getFullYear()} {data.businessName}.</p>
          <div className="h-px w-8 bg-slate-100 mx-auto"></div>
          <p className="text-[9px] sm:text-[10px] font-black text-slate-300 tracking-[0.1em] flex items-center justify-center gap-2 uppercase">POWERED BY <span className="text-white font-black px-3 sm:px-4 py-1 sm:py-1.5 bg-slate-900 rounded-xl text-[10px] sm:text-[12px] shadow-2xl">B.J.C</span></p>
        </div>
      </footer>

      {isCartOpen && (
        <div className="fixed inset-0 z-[110] bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom duration-300">
            <div className="p-6 sm:p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-tighter">Seu Carrinho</h3>
                <button onClick={() => setIsCartOpen(false)} className="bg-slate-100 p-2 sm:p-3 rounded-full"><X size={18}/></button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
               {cart.length === 0 ? (
                 <p className="text-center text-slate-400 py-10 font-bold uppercase text-[10px]">O carrinho está vazio</p>
               ) : (
                 cart.map(item => (
                   <div key={item.id} className="p-4 sm:p-5 bg-slate-50 rounded-[1.8rem] sm:rounded-[2rem] border border-slate-100">
                     <div className="flex justify-between items-start mb-4">
                       <div className="flex items-center gap-3">
                          {item.imageUrl && <img src={item.imageUrl} className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl object-cover" alt="" />}
                          <div>
                            <p className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase">{item.name}</p>
                            <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold">R$ {item.price}</p>
                          </div>
                       </div>
                       <button onClick={() => toggleCartItem(item)} className="text-slate-300 hover:text-red-500"><Trash2 size={16}/></button>
                     </div>
                     <div className="flex items-center justify-between bg-white p-2.5 sm:p-3 rounded-2xl shadow-sm">
                       <span className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase px-2">Qtd</span>
                       <div className="flex items-center gap-3 sm:gap-4">
                         <button onClick={() => updateQty(item.id, -1)} className="p-1 bg-slate-50 rounded-lg text-slate-900"><Minus size={12}/></button>
                         <span className="text-xs sm:text-sm font-black text-slate-900">{item.qty}</span>
                         <button onClick={() => updateQty(item.id, 1)} className="p-1 bg-slate-900 rounded-lg text-white"><Plus size={12}/></button>
                       </div>
                     </div>
                   </div>
                 ))
               )}
            </div>
            <div className="p-6 sm:p-8 border-t border-slate-50 bg-slate-50/50 rounded-b-[3rem]">
               <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Total Estimado</span>
                  <span className="text-xl font-black text-slate-900 tracking-tighter">R$ {cartTotal}</span>
               </div>
               <button 
                onClick={finalizeOrder}
                disabled={cart.length === 0}
                style={{ backgroundColor: data.primaryColor }}
                className="w-full py-5 rounded-[1.8rem] text-white font-black uppercase text-xs tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
               >
                 SOLICITAR VIA WHATSAPP <Send size={16}/>
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
