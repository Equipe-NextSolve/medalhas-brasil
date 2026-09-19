import Messenger from '@/layout/ChatBot/Messenger'
import LoadingScreen from '@/layout/Loanding/Loanding'
import InitialAbout from './InitialAbout'
import MedalAbout from './MedalAbout'

export default function About() {
    return (
        <LoadingScreen>
            <section className='w-full min-h-screen pt-10 -mb-20'>
                <InitialAbout />
                <MedalAbout />
                <Messenger />
            </section>
        </LoadingScreen>
    )
}