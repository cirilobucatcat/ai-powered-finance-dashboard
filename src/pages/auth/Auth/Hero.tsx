export default function LoginHero() {
    return (<div className='hidden sm:flex w-full h-full flex-col items-center justify-center'>
        <img src="./images/bird_hero.png" className='w-[250px]' alt="Bird Hero" />
        <div className="w-3/4 text-center space-y-4">
            <h3 className="text-3xl uppercase font-bold tracking-widest text-electric-lime font-sour-gummy">FineBird</h3>
            <p className="text-sm text-slate-300 font-medium">AI-powered finance dashboard that helps you track, analyze, and optimize your finances with real-time insights and smart recommendations — all in one simple, intuitive platform.</p>
        </div>
    </div>)
}