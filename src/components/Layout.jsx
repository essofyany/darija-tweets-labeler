/** @format */

import Image from 'next/image';
import GithubIcon from './GithubIcon';
import fsr from '../../public/fsr.png';
import mit from '../../public/mit.png';
import { useRouter } from 'next/router';

function Layout({ children }) {
	const { route } = useRouter();
	//console.log(route);
	return (
		<>
			<header>
				<figure className='logo-fsr'>
					<Image
						objectFit='cover'
						objectPosition='center'
						src={fsr}
						alt='fsr'
					/>
				</figure>
				<div style={{display:"flex", flexDirection:"column", alignItems:"start", paddingRight:"40px"}}>
					<h1 className='title'>
						{route.includes('classifier')
							? 'Sentiments Analysis'
							: 'Tweets Labeler'}
					</h1>
					<p className='title'>
						Tweets labeler for sentiments analysis purpose
					</p>
				</div>
			</header>
			<main>{children}</main>
			<footer>
				<p>Developed by: Chaymaa Rouiouih</p>
				<p>2022/2023</p>
			</footer>
		</>
	);
}

export default Layout;
