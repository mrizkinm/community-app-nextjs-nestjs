--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-04-17 11:58:48

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
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
-- TOC entry 224 (class 1259 OID 16934)
-- Name: comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comment (
    id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "authorId" integer,
    "postId" integer
);


ALTER TABLE public.comment OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16933)
-- Name: comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.comment_id_seq OWNER TO postgres;

--
-- TOC entry 4927 (class 0 OID 0)
-- Dependencies: 223
-- Name: comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comment_id_seq OWNED BY public.comment.id;


--
-- TOC entry 222 (class 1259 OID 16927)
-- Name: like; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."like" (
    id integer NOT NULL,
    "userId" integer,
    "postId" integer,
    "commentId" integer,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."like" OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16926)
-- Name: like_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.like_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.like_id_seq OWNER TO postgres;

--
-- TOC entry 4928 (class 0 OID 0)
-- Dependencies: 221
-- Name: like_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.like_id_seq OWNED BY public."like".id;


--
-- TOC entry 218 (class 1259 OID 16907)
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16906)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- TOC entry 4929 (class 0 OID 0)
-- Dependencies: 217
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 226 (class 1259 OID 16944)
-- Name: post; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post (
    id integer NOT NULL,
    content text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "authorId" integer,
    status boolean DEFAULT false NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.post OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16943)
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.post_id_seq OWNER TO postgres;

--
-- TOC entry 4930 (class 0 OID 0)
-- Dependencies: 225
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- TOC entry 229 (class 1259 OID 16967)
-- Name: post_tags_tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.post_tags_tag (
    "postId" integer NOT NULL,
    "tagId" integer NOT NULL
);


ALTER TABLE public.post_tags_tag OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16916)
-- Name: tag; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.tag OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16915)
-- Name: tag_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tag_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tag_id_seq OWNER TO postgres;

--
-- TOC entry 4931 (class 0 OID 0)
-- Dependencies: 219
-- Name: tag_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tag_id_seq OWNED BY public.tag.id;


--
-- TOC entry 228 (class 1259 OID 16955)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    name character varying NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    role character varying DEFAULT 'user'::character varying NOT NULL,
    token text
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 16954)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 4728 (class 2604 OID 16937)
-- Name: comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment ALTER COLUMN id SET DEFAULT nextval('public.comment_id_seq'::regclass);


--
-- TOC entry 4726 (class 2604 OID 16930)
-- Name: like id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like" ALTER COLUMN id SET DEFAULT nextval('public.like_id_seq'::regclass);


--
-- TOC entry 4724 (class 2604 OID 16910)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 4730 (class 2604 OID 16947)
-- Name: post id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- TOC entry 4725 (class 2604 OID 16919)
-- Name: tag id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag ALTER COLUMN id SET DEFAULT nextval('public.tag_id_seq'::regclass);


--
-- TOC entry 4733 (class 2604 OID 16958)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4916 (class 0 OID 16934)
-- Dependencies: 224
-- Data for Name: comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comment (id, content, "createdAt", "authorId", "postId") FROM stdin;
11	helo hendro	2025-04-17 09:54:42.53875	1	27
14	Helloo	2025-04-17 10:52:45.083428	1	27
\.


--
-- TOC entry 4914 (class 0 OID 16927)
-- Dependencies: 222
-- Data for Name: like; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."like" (id, "userId", "postId", "commentId", "createdAt") FROM stdin;
17	4	25	\N	2025-04-17 07:46:30.042085
26	1	\N	11	2025-04-17 11:02:34.951468
\.


--
-- TOC entry 4910 (class 0 OID 16907)
-- Dependencies: 218
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1744729198116	InitialMigrations1744729198116
\.


--
-- TOC entry 4918 (class 0 OID 16944)
-- Dependencies: 226
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post (id, content, "createdAt", "authorId", status, title) FROM stdin;
27	hehehehe	2025-04-17 08:34:49.810545	4	t	hehe
28	okeoke	2025-04-17 09:55:06.839319	1	t	Post lagi ahh
25	ini adalah post pertamaku	2025-04-17 07:40:10.958867	4	f	Post pertama
26	lagi ngapain semuanya	2025-04-17 08:31:51.398074	4	f	post lagi
29	My second post	2025-04-17 10:41:49.981835	1	f	Hello
\.


--
-- TOC entry 4921 (class 0 OID 16967)
-- Dependencies: 229
-- Data for Name: post_tags_tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.post_tags_tag ("postId", "tagId") FROM stdin;
25	12
25	11
26	16
27	16
28	17
29	8
29	9
\.


--
-- TOC entry 4912 (class 0 OID 16916)
-- Dependencies: 220
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tag (id, name) FROM stdin;
7	makan
8	info
9	post
10	sore
11	yeay
12	first
13	sedih
14	malam
15	sunyi
16	hehe
17	oke
\.


--
-- TOC entry 4920 (class 0 OID 16955)
-- Dependencies: 228
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, password, name, "createdAt", role, token) FROM stdin;
4	hendro@gmail.com	$2b$10$JeqFghFkHrA1N9Ka0.9jYeP2ft6kMijyNcVR/x./flmwXHxzjtD.u	Hendro	2025-04-17 07:38:03.673329	user	\N
1	user@gmail.com	$2b$10$PBg5hZhEaadoZ/JQyKy19OpvDaWY5griIO7r4OHE5Y0rn9g5cgarO	Jono	2025-04-15 23:31:23.075366	user	\N
5	wahyudi@gmail.com	$2b$10$lVnBeYrU/G8auNCTa0Ym7ODkRK86sD4SrWopgqIhr.LNkBI4aTOMq	Wahyudi	2025-04-17 10:02:47.351652	admin	\N
3	user2@gmail.com	$2b$10$auYSy9CWUw.Yvj85t64XOul55.jh/wQuyPRd5B7Dpls5STcUjxx12	Joko Susilo	2025-04-16 15:13:33.43388	user	\N
6	dono@gmail.com	$2b$10$MUa9Eg.Y6KJfOv/uNCGQ4OjdcVQBIRnziA2ja5zINRCch79aJvBqS	Dono	2025-04-17 10:14:02.546393	user	\N
7	kasino@gmail.com	$2b$10$iK.dM5Lpi7TuE1VmwNabZu3HRblq0KAA4tx.RgyRzH0GXUzkWEwza	Kasino	2025-04-17 10:17:11.310899	admin	\N
8	indro@gmail.com	$2b$10$SDrp27KaFrs5Gi4XwJ1i4ey8a/FsM4qI2hb8s07QOvD7re/Iuuqti	Indro	2025-04-17 10:18:27.727622	admin	\N
2	admin@gmail.com	$2b$10$lME0Tk9q0OEq6dXwJ030i.ga/fSgvJjAfnm4sx.L9MCiDj3FI2rvK	Joko	2025-04-15 23:45:04.995182	admin	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9rbyIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWQiOjIsImlhdCI6MTc0NDg2MDM5NiwiZXhwIjoxNzQ1NDY1MTk2fQ.nOxVL9XIRWSnDihdHGnztfJ2FefoOoS5s710_na4lYA
\.


--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 223
-- Name: comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comment_id_seq', 14, true);


--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 221
-- Name: like_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.like_id_seq', 26, true);


--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 217
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 1, true);


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 225
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.post_id_seq', 29, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 219
-- Name: tag_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tag_id_seq', 17, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 227
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 8, true);


--
-- TOC entry 4745 (class 2606 OID 16942)
-- Name: comment PK_0b0e4bbc8415ec426f87f3a88e2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY (id);


--
-- TOC entry 4737 (class 2606 OID 16914)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 4739 (class 2606 OID 16923)
-- Name: tag PK_8e4052373c579afc1471f526760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY (id);


--
-- TOC entry 4747 (class 2606 OID 16953)
-- Name: post PK_be5fda3aac270b134ff9c21cdee; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY (id);


--
-- TOC entry 4749 (class 2606 OID 16964)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4755 (class 2606 OID 16971)
-- Name: post_tags_tag PK_e9b7b8e6a07bdccb6a954171676; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "PK_e9b7b8e6a07bdccb6a954171676" PRIMARY KEY ("postId", "tagId");


--
-- TOC entry 4743 (class 2606 OID 16932)
-- Name: like PK_eff3e46d24d416b52a7e0ae4159; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "PK_eff3e46d24d416b52a7e0ae4159" PRIMARY KEY (id);


--
-- TOC entry 4741 (class 2606 OID 16925)
-- Name: tag UQ_6a9775008add570dc3e5a0bab7b; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE (name);


--
-- TOC entry 4751 (class 2606 OID 16966)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4752 (class 1259 OID 16973)
-- Name: IDX_41e7626b9cc03c5c65812ae55e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_41e7626b9cc03c5c65812ae55e" ON public.post_tags_tag USING btree ("tagId");


--
-- TOC entry 4753 (class 1259 OID 16972)
-- Name: IDX_b651178cc41334544a7a9601c4; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_b651178cc41334544a7a9601c4" ON public.post_tags_tag USING btree ("postId");


--
-- TOC entry 4759 (class 2606 OID 17045)
-- Name: comment FK_276779da446413a0d79598d4fbd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_276779da446413a0d79598d4fbd" FOREIGN KEY ("authorId") REFERENCES public."user"(id) ON DELETE CASCADE;


--
-- TOC entry 4756 (class 2606 OID 17030)
-- Name: like FK_3acf7c55c319c4000e8056c1279; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "FK_3acf7c55c319c4000e8056c1279" FOREIGN KEY ("postId") REFERENCES public.post(id) ON DELETE CASCADE;


--
-- TOC entry 4762 (class 2606 OID 17009)
-- Name: post_tags_tag FK_41e7626b9cc03c5c65812ae55e8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "FK_41e7626b9cc03c5c65812ae55e8" FOREIGN KEY ("tagId") REFERENCES public.tag(id);


--
-- TOC entry 4760 (class 2606 OID 17040)
-- Name: comment FK_94a85bb16d24033a2afdd5df060; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comment
    ADD CONSTRAINT "FK_94a85bb16d24033a2afdd5df060" FOREIGN KEY ("postId") REFERENCES public.post(id) ON DELETE CASCADE;


--
-- TOC entry 4763 (class 2606 OID 17004)
-- Name: post_tags_tag FK_b651178cc41334544a7a9601c45; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post_tags_tag
    ADD CONSTRAINT "FK_b651178cc41334544a7a9601c45" FOREIGN KEY ("postId") REFERENCES public.post(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 4761 (class 2606 OID 17019)
-- Name: post FK_c6fb082a3114f35d0cc27c518e0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT "FK_c6fb082a3114f35d0cc27c518e0" FOREIGN KEY ("authorId") REFERENCES public."user"(id);


--
-- TOC entry 4757 (class 2606 OID 17050)
-- Name: like FK_d86e0a3eeecc21faa0da415a18a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "FK_d86e0a3eeecc21faa0da415a18a" FOREIGN KEY ("commentId") REFERENCES public.comment(id) ON DELETE CASCADE;


--
-- TOC entry 4758 (class 2606 OID 17055)
-- Name: like FK_e8fb739f08d47955a39850fac23; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."like"
    ADD CONSTRAINT "FK_e8fb739f08d47955a39850fac23" FOREIGN KEY ("userId") REFERENCES public."user"(id);


-- Completed on 2025-04-17 11:58:49

--
-- PostgreSQL database dump complete
--

