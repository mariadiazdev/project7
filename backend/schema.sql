-- Table: public.Posts

-- DROP TABLE IF EXISTS public."Posts";

CREATE TABLE IF NOT EXISTS public."Posts"
(
    id integer NOT NULL DEFAULT nextval('"Posts_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default",
    message character varying(1024) COLLATE pg_catalog."default",
    "mediaUrl" character varying(255) COLLATE pg_catalog."default",
    "userId" integer,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Posts_pkey" PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Posts"
    OWNER to postgres;


-- Table: public.UserRead

-- DROP TABLE IF EXISTS public."UserRead";

CREATE TABLE IF NOT EXISTS public."UserRead"
(
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "PostId" integer NOT NULL,
    "UserId" integer NOT NULL,
    CONSTRAINT "UserRead_pkey" PRIMARY KEY ("PostId", "UserId"),
    CONSTRAINT "UserRead_PostId_fkey" FOREIGN KEY ("PostId")
        REFERENCES public."Posts" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT "UserRead_UserId_fkey" FOREIGN KEY ("UserId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."UserRead"
    OWNER to postgres;


-- Table: public.Users

-- DROP TABLE IF EXISTS public."Users";

CREATE TABLE IF NOT EXISTS public."Users"
(
    id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
    "firstName" character varying(255) COLLATE pg_catalog."default",
    "lastName" character varying(255) COLLATE pg_catalog."default",
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    password character varying(255) COLLATE pg_catalog."default",
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Users_pkey" PRIMARY KEY (id),
    CONSTRAINT "Users_email_key" UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."Users"
    OWNER to postgres;