import { useState } from 'react';
import { Button, BigHeading, Badge, Tape } from './UI';
import { generateKindnessTask, KindnessTask } from '../services/geminiService';
import { Sparkle, Flower, Heart, ScribbleLoop } from './Icons';

const KindnessGenerator = () => {
  const [task, setTask] = useState<KindnessTask | null>(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setCompleted(false);
    try {
      const newTask = await generateKindnessTask();
      setTask(newTask);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto relative">
      {/* Decorative Blobs behind the card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradz-matcha/20 rounded-full blur-3xl opacity-50 -z-10 animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
        {/* Text Side */}
        <div className="lg:col-span-5 text-center lg:text-left space-y-6 relative">
            <ScribbleLoop className="absolute -top-10 -left-10 w-32 h-32 text-gradz-peach opacity-50 animate-float-delayed hidden lg:block" />
           <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-gradz-stone shadow-[4px_4px_0px_0px_#E8E6E1]">
              <Flower className="w-5 h-5 text-gradz-peach animate-spin-slow" />
              <span className="text-sm font-bold text-gradz-charcoal/80 font-sans">Daily Practice Engine</span>
           </div>
           <BigHeading className="text-6xl md:text-7xl lg:text-8xl text-gradz-green leading-[0.85]">
             Flex Your <br/>
             <span className="italic font-hand text-6xl md:text-8xl text-gradz-peach relative inline-block transform -rotate-2 mt-2">
                Heart Muscle
                <span className="absolute -bottom-4 left-0 w-full h-4 bg-gradz-matcha/40 -z-10 rounded-full blur-sm"></span>
             </span>
           </BigHeading>
           <p className="text-xl text-gradz-charcoal/80 leading-relaxed font-sans">
             We train our bodies and our minds. But what about our empathy?
             Use the engine to receive a bespoke act of kindness designed to brighten someone's day.
           </p>
        </div>

        {/* Interactive Card Side */}
        <div className="lg:col-span-7 w-full">
          <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500">
             <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-2" />
             <div className="relative bg-white rounded-[3rem] p-3 shadow-2xl shadow-gradz-green/10 border border-gradz-stone">
                <div className="bg-gradz-cream rounded-[2.5rem] p-8 md:p-12 min-h-[450px] flex flex-col justify-center items-center relative overflow-hidden border-2 border-dashed border-gradz-stone/50">

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/graphy.png')]"></div>

                {loading ? (
                   <div className="flex flex-col items-center text-center animate-pulse">
                      <div className="w-24 h-24 bg-gradz-matcha/30 rounded-full flex items-center justify-center mb-6 border-4 border-white shadow-lg">
                         <Heart className="w-12 h-12 text-gradz-green animate-ping" />
                      </div>
                      <h3 className="font-serif text-3xl text-gradz-green mb-2">Cooking up vibes...</h3>
                      <p className="text-gradz-charcoal/60 font-sans">Consulting the kindness algorithm</p>
                   </div>
                ) : task ? (
                   <div className="w-full text-left animate-fade-in-up">
                      <div className="flex justify-between items-start mb-8 border-b-2 border-dashed border-gradz-stone pb-6">
                         <div>
                            <Badge text={`Level: ${task.difficulty}`} color="matcha" />
                            <h2 className="font-serif text-3xl md:text-5xl text-gradz-green mt-4 leading-none tracking-tight">
                              {task.title}
                            </h2>
                         </div>
                         <div className="bg-gradz-lilac/30 p-4 rounded-full rotate-12 hidden sm:block border-2 border-white shadow-sm">
                            <Sparkle className="w-8 h-8 text-gradz-charcoal" />
                         </div>
                      </div>

                      <div className="prose prose-lg mb-8 text-gradz-charcoal">
                         <p className="text-2xl font-hand leading-relaxed transform -rotate-1">{task.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center justify-between mt-8 pt-6 border-t border-gradz-stone/30">
                         <div className="flex items-center gap-2 text-sm font-bold text-gradz-charcoal/60 uppercase tracking-wider font-sans">
                            <span className="w-3 h-3 rounded-full bg-gradz-peach border border-gradz-charcoal"></span>
                            Est. Time: {task.estimatedTime}
                         </div>
                         <div className="flex gap-3 w-full sm:w-auto">
                            <Button onClick={() => setCompleted(true)} variant={completed ? 'white' : 'primary'} className="flex-1 sm:flex-initial shadow-gradz-green/20">
                               {completed ? 'Recorded!' : 'Accept Challenge'}
                            </Button>
                            <Button onClick={handleGenerate} variant="outline" className="!px-4 border-gradz-stone text-gradz-charcoal hover:bg-gradz-stone">
                               Skip
                            </Button>
                         </div>
                      </div>
                   </div>
                ) : (
                   <div className="text-center max-w-md mx-auto">
                      <div className="mb-8 relative inline-block">
                         <div className="absolute -inset-6 bg-gradz-butter/40 rounded-full blur-xl animate-wiggle"></div>
                         <div className="bg-white p-6 rounded-full shadow-xl relative z-10">
                            <Sparkle className="w-16 h-16 text-gradz-green" />
                         </div>
                      </div>
                      <h3 className="font-serif text-4xl text-gradz-green mb-4">Ready to help?</h3>
                      <p className="text-gradz-charcoal/60 mb-8 text-lg font-sans">
                         Press the button below to receive your unique kindness directive for the day.
                      </p>
                      <Button onClick={handleGenerate} variant="primary" withIcon className="w-full py-5 text-lg shadow-gradz-peach/40 bg-gradz-green hover:bg-gradz-green">
                         Generate Act
                      </Button>
                   </div>
                )}
             </div>

             {/* Decorative elements on the card itself */}
             <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradz-peach rounded-full flex items-center justify-center shadow-xl animate-bounce border-4 border-white z-20">
                <span className="font-hand font-bold text-xl -rotate-12">Free!</span>
             </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default KindnessGenerator;
