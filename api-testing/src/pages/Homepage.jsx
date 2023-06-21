import React, { useState, useEffect } from "react";
import axios from "axios";
import {
	TextInput,
	Button,
	Card,
	Text,
	Title,
	Loader,
	Skeleton,
	Alert,
} from "@mantine/core";
import "./homepage.css";
import { Icon } from "@iconify/react";

const Homepage = () => {
	const [temp, setTemp] = useState([]);
	const [altitude, setAltitude] = useState([]);
	const [sunrise, setSunrise] = useState([]);
	const [sunset, setSunset] = useState([]);
	const [long, setLong] = useState("");
	const [lat, setLat] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsLoading(true);
		if (!long || !lat) {
			setIsLoading(false);
			// return setError(true);
		} else {
			const fetchWeather = async () => {
				await axios
					.get(
						`https://api.open-meteo.com/v1/forecast?latitude=${long}&longitude=${lat}&hourly=temperature_2m&daily=weathercode,sunrise,sunset&timezone=America%2FLos_Angeles`
					)
					.then((res) => {
						setTemp(res.data.hourly.temperature_2m[0]);
						setAltitude(res.data.elevation);
						setSunrise(res.data.daily.sunrise);
						setSunset(res.data.daily.sunset);
					})
					.catch((err) => console.log(err))
					.finally(() => {
						setIsLoading(false);
					});
			};
			fetchWeather();
		}
	};

	// if (error) {
	// 	return <h1>{error.message}</h1>;
	// }

	return (
		<form className="card" onSubmit={handleSubmit}>
			<Title order={2} ta="center" className="title" p={20}>
				Enter{" "}
				<Text span c="blue" inherit>
					Longitude
				</Text>{" "}
				and{" "}
				<Text span c="blue" inherit>
					Latitude
				</Text>{" "}
				to get Weather Data
			</Title>
			<div className="inputs">
				<TextInput
					pb={10}
					w="50%"
					label="Longitude"
					placeholder="##.##"
					className="input"
					radius="md"
					size="md"
					value={long}
					onChange={(e) => setLong(e.target.value)}
				/>

				<TextInput
					pb={10}
					w="50%"
					label="Latitude"
					placeholder="##.##"
					radius="md"
					size="md"
					className="input"
					value={lat}
					onChange={(e) => setLat(e.target.value)}
				/>
				<Button
					w="50%"
					variant="filled"
					radius="md"
					size="md"
					type="submit"
					className="button">
					{isLoading ? <Loader size="sm" color="white" /> : "Get"}
				</Button>
				{/* <p>{error && "error"}</p> */}
				{/* <Alert title="Bummer!" color="red">
					{error ? "Something terrible happened!" : <p>hi</p>}
				</Alert> */}
			</div>
			<Card.Section p="md" radius="md" className="section">
				<div position="left" mt="xl">
					<Icon icon="circum:temp-high" className="icon" />
					<Text size="md" weight={700}>
						Temp:
					</Text>
					<Skeleton visible={isLoading} width="10%" radius="md">
						<Text size="sm">{`${temp}` + "°C"}</Text>
					</Skeleton>
				</div>
				<div position="left" mt="xl">
					<Icon icon="la:mountain" className="icon" />
					<Text size="md" weight={700}>
						Altitude:
					</Text>
					<Skeleton visible={isLoading} width="10%" radius="md">
						<Text size="sm">{`${altitude}` + "m"}</Text>
					</Skeleton>
				</div>
				<div position="left" mt="xl">
					<Icon icon="solar:sunrise-linear" className="icon" />
					<Text size="md" weight={700}>
						Sunrise:{" "}
					</Text>
					<Skeleton visible={isLoading} width="25%" radius="md">
						<Text size="md">{sunrise[0]} </Text>
					</Skeleton>
				</div>
				<div position="left" mt="xl">
					<Icon icon="solar:sunset-linear" className="icon" />
					<Text size="md" weight={700}>
						Sunset:{" "}
					</Text>
					<Skeleton visible={isLoading} width="25%" radius="md">
						<Text size="md">{sunset[0]} </Text>
					</Skeleton>
				</div>
			</Card.Section>
		</form>
	);
};

export default Homepage;
