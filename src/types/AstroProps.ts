export interface BaseProps {
  class?: string;
  id?: string;
  [key: string]: any;
}

export class AstroProps<T extends BaseProps = BaseProps> {
  private props: T;

  constructor(props: T) {
    this.props = props;
  }

  public get<K extends keyof T>(key: K): T[K] {
    return this.props[key];
  }

  public set<K extends keyof T>(key: K, value: T[K]): void {
    this.props[key] = value;
  }

  public has(key: keyof T): boolean {
    return key in this.props;
  }

  public merge(newProps: Partial<T>): AstroProps<T> {
    return new AstroProps<T>({ ...this.props, ...newProps });
  }

  public toObject(): T {
    return { ...this.props };
  }

  public getClasses(): string {
    return this.props.class || '';
  }

  public addClasses(classes: string): AstroProps<T> {
    const currentClasses = this.props.class || '';
    const newClasses = `${currentClasses} ${classes}`.trim();
    return this.merge({ class: newClasses } as Partial<T>);
  }
}

// Example type for a specific component's props
export interface LayoutProps extends BaseProps {
  title?: string;
  description?: string;
  lang?: string;
}

export interface BlogPostProps extends LayoutProps {
  content: {
    title: string;
    description: string;
    pubDate: Date;
    updatedDate?: Date;
    hero: {
      image: string;
      alt: string;
      caption?: string;
    };
    author: {
      name: string;
      avatar?: string;
      bio?: string;
    };
    categories: string[];
    tags: string[];
    status: 'draft' | 'published' | 'archived';
    readingTime?: number;
    featured: boolean;
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      canonicalUrl?: string;
      ogImage?: string;
    };
  };
}

// Example type for a component's props
export interface ComponentProps extends BaseProps {
  name?: string;
  isActive?: boolean;
}