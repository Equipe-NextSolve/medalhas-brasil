import Messenger from '@/layout/ChatBot/Messenger'
import LoadingScreen from '@/layout/Loanding/Loanding'
import ContentPolitic from './ContentPolitic'
import PresentationPolitic from './PresentationPolitic'

export default function Politic() {
    return (
        <LoadingScreen>
            <section className='w-full min-h-screen pt-15 -mb-20'>
                <ContentPolitic />
                <PresentationPolitic />
                <Messenger />
            </section>
        </LoadingScreen>
    )
}