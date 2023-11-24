import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCoins } from '../api';
import { Helmet } from 'react-helmet';

const Container = styled.div`
	padding: 0 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.div``;

const CoinList = styled.ul`
	margin-top: 40px;
`;

const Coin = styled.li`
	max-width: 500px;
	height: 40px;
	border-radius: 50px;
	font-size: 18px;
	margin-bottom: 10px;
	color: ${(props) => props.theme.bgColor};
	background-color: #fff;
	justify-content: flex-start;
	a {
		display: flex;
		align-items: center;
		transition: color 0.2s ease-in;
	}
	&:hover {
		a {
			color: ${(props) => props.theme.accentColor};
		}
	}
`;

const Title = styled.h1`
	text-align: center;
	font-size: 48px;
	color: ${(props) => props.theme.accentColor};
`;

const Loader = styled(Title)`
	font-size: 72px;
	margin-top: 200px;
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin: 0 20px;
`;

interface CoinInterface {
	id: string;
	name: string;
	symbol: string;
	rank: number;
	is_new: boolean;
	is_active: boolean;
	type: string;
}

function Coins() {
	const { isLoading, data } = useQuery<CoinInterface[]>('allCoins', fetchCoins);

	// const [coins, setCoins] = useState<CoinInterface[]>([]);
	// const [loading, setLoading] = useState(true);

	// useEffect(() => {
	// 	(async () => {
	// 		const response = await fetch('https://api.coinpaprika.com/v1/coins');
	// 		const json = await response.json();
	// 		setCoins(json.slice(0, 20));
	// 		setLoading(false);
	// 	})();
	// }, []);

	return (
		<Container>
			<Helmet>
				<title>코인</title>
			</Helmet>
			<Header>
				<Title>Main Page</Title>
			</Header>
			{isLoading ? (
				<Loader>Loading...</Loader>
			) : (
				<CoinList>
					{data?.slice(0, 100).map((coin) => (
						<Coin key={coin.id}>
							<Link
								to={{
									pathname: `/${coin.id}`,
									state: { name: coin.name },
								}}>
								<Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLocaleLowerCase()}`}></Img>
								{coin.name} &rarr;
							</Link>
						</Coin>
					))}
				</CoinList>
			)}
		</Container>
	);
}

export default Coins;
