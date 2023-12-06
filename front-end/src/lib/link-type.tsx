export type LinkType ="internal"|"external";

export const LinkTypes:Record <string, LinkType> = {//le type est défini par Record pour annoncer un type clé "INTERNAL | EXTERNAL" et un type valeur qui est LinkType
    INTERNAL:"internal",
    EXTERNAL:"external",
};