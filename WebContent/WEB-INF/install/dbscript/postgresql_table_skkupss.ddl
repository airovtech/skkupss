CREATE TABLE productService (
	id character varying(50) NOT NULL,
	name character varying(50),
	picture character varying(50),
	--desc -> description
	description character varying(4000),
	productServiceSpace character varying(4000),
	productSpace character varying(4000),
	touchPointSpace character varying(4000),
	customerSpace character varying(4000),
	actorSpace character varying(4000),
	societySpace character varying(4000),
	contextSpace character varying(4000),
	timeSpace character varying(4000),
	environmentSpace character varying(4000),
	lastModifiedUser character varying(50),
	lastModifiedDate timestamp,
	createdUser	character varying(50),
	createdDate timestamp,
	primary key (id)
);	

CREATE TABLE valueSpace (
	id character varying(50) NOT NULL,
	psId character varying(50) NOT NULL,
	economical character varying(4000),
	ecological character varying(4000),
	function character varying(4000),
	extrinsicSocial character varying(4000),
	activeEmotional character varying(4000),
	reactiveEmotional character varying(4000),
	intrinsicSocial character varying(4000),
	epistemic character varying(4000),
	primary key (id)
);	

CREATE TABLE serviceSpace (
	id character varying(50) NOT NULL,
	psId character varying(50) NOT NULL,
	sspp character varying(4000),
	ssp character varying(4000),
	sspc character varying(4000),
	ssc character varying(4000),
	sscc character varying(4000),
	primary key (id)
);	

CREATE TABLE bizModelSpace (
	id character varying(50) NOT NULL,
	psId character varying(50) NOT NULL,
	customerSegments character varying(4000),
	customerSegmentsUser character varying(4000),
	CustomerRelationships character varying(4000),
	CustomerRelationshipsUser character varying(4000),
	channels character varying(4000),
	channelsUser character varying(4000),
	keyActivities character varying(4000),
	keyActivitiesUser character varying(4000),
	keyResources character varying(4000),
	keyResourcesUser character varying(4000),
	keyPartners character varying(4000),
	keyPartnersUser character varying(4000),
	valuePropositionsUser character varying(4000),
	costStructure character varying(4000),
	costStructureUser character varying(4000),
	revenueStreams character varying(4000),
	revenueStreamsUser character varying(4000),
	primary key (id)
);	