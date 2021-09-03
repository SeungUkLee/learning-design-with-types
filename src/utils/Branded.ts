// declare const _brand: unique symbol;

// type Tagged<Tag extends string> = { [_brand]: Tag }
type Tagged<Tag extends string> = { _tag: Tag }

// TODO:
export type Branded<Type, Tag extends string> = (
  Type extends { _tag: any }
    ? { data: Type }
    : Type
) & Tagged<Tag>

export type Unwrap<T> = T extends Branded<infer Type, string> ? Type : never;

