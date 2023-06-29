--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-2.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE number_guess;
--
-- Name: number_guess; Type: DATABASE; Schema: -; Owner: freecodecamp
--

CREATE DATABASE number_guess WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE number_guess OWNER TO freecodecamp;

\connect number_guess

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: users; Type: TABLE; Schema: public; Owner: freecodecamp
--

CREATE TABLE public.users (
    username character varying(30) NOT NULL,
    games_played integer NOT NULL,
    best_game integer NOT NULL
);


ALTER TABLE public.users OWNER TO freecodecamp;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: freecodecamp
--

INSERT INTO public.users VALUES ('Lorenzo2', 1, 9);
INSERT INTO public.users VALUES ('user_1659492116630', 4, 66);
INSERT INTO public.users VALUES ('user_1659492229562', 1, 388);
INSERT INTO public.users VALUES ('user_1659492229563', 3, 26);
INSERT INTO public.users VALUES ('user_1659492278068', 2, 141);
INSERT INTO public.users VALUES ('user_1659492278069', 3, 179);
INSERT INTO public.users VALUES ('user_1659492350808', 1, 223);
INSERT INTO public.users VALUES ('user_1659492350809', 2, 26);
INSERT INTO public.users VALUES ('user_1659492438113', 1, 40);
INSERT INTO public.users VALUES ('user_1659492438114', 3, 285);
INSERT INTO public.users VALUES ('Lor', 2, 9);
INSERT INTO public.users VALUES ('Lorenzo', 5, 8);
INSERT INTO public.users VALUES ('', 1, 16);
INSERT INTO public.users VALUES ('user_1659493097308', 2, 235);
INSERT INTO public.users VALUES ('user_1659493097309', 5, 248);
INSERT INTO public.users VALUES ('user_1659493130525', 2, 164);
INSERT INTO public.users VALUES ('user_1659493130526', 5, 94);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: freecodecamp
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- PostgreSQL database dump complete
--

